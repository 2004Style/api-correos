import {
  Injectable,
  Logger,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbContext } from 'src/context/db-context';
import { UserService } from 'src/user/user.service';
import { RegisterDto, LoginDto, AuthResponseDto, JwtPayload } from './auth.dto';
import { hash, compare } from 'bcrypt';
import type { User } from 'prisma/generated/prisma';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  /**
   * Registrar nuevo usuario
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    try {
      // Validar que las contraseñas coincidan
      if (registerDto.contrasena !== registerDto.confirmaContrasena) {
        throw new BadRequestException('Las contraseñas no coinciden');
      }

      // Validar que el usuario no exista
      const existingUser = await DbContext.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new ConflictException('El email ya está registrado');
      }

      // Validar que el username no exista
      const existingUsername = await DbContext.user.findUnique({
        where: { username: registerDto.username },
      });

      if (existingUsername) {
        throw new ConflictException('El username ya está en uso');
      }

      // Hash de la contraseña
      const hashedPassword = await hash(registerDto.contrasena, 10);

      this.logger.log(`Registrando nuevo usuario: ${registerDto.email}`);

      // Crear usuario con rol USER por defecto
      const user = await DbContext.user.create({
        data: {
          username: registerDto.username,
          email: registerDto.email,
          telefono: registerDto.telefono || null,
          contrasena: hashedPassword,
          activo: true,
          verificado: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: {
            connect: { name: 'USER' },
          },
        },
      });

      // Generar token JWT
      const token = this.generateToken(user);

      return {
        id: user.id,
        username: user.username,
        email: user.email || '',
        telefono: user.telefono,
        access_token: token,
        token_type: 'Bearer',
        expires_in: 24 * 60 * 60, // 24 horas en segundos
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      this.logger.error(
        `Error al registrar usuario: ${registerDto.email}`,
        error instanceof Error ? error.message : 'Unknown error',
      );

      throw new BadRequestException('Error al registrar el usuario');
    }
  }

  /**
   * Login de usuario con email y contraseña
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    try {
      this.logger.log(`Login attempt para: ${loginDto.email}`);

      // Buscar usuario por email
      const user = await DbContext.user.findUnique({
        where: { email: loginDto.email },
      });

      if (!user) {
        throw new UnauthorizedException('Email o contraseña inválidos');
      }

      // Validar contraseña
      if (!user.contrasena) {
        throw new UnauthorizedException('Este usuario no tiene contraseña');
      }

      const isPasswordValid = await compare(
        loginDto.contrasena,
        user.contrasena,
      );

      if (!isPasswordValid) {
        throw new UnauthorizedException('Email o contraseña inválidos');
      }

      // Actualizar último acceso
      await DbContext.user.update({
        where: { id: user.id },
        data: { updatedAt: new Date() },
      });

      // Generar token JWT
      const token = this.generateToken(user);

      this.logger.log(`Login exitoso para: ${loginDto.email}`);

      return {
        id: user.id,
        username: user.username,
        email: user.email || '',
        telefono: user.telefono,
        access_token: token,
        token_type: 'Bearer',
        expires_in: 24 * 60 * 60, // 24 horas en segundos
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(
        `Error en login para: ${loginDto.email}`,
        error instanceof Error ? error.message : 'Unknown error',
      );

      throw new UnauthorizedException('Error en la autenticación');
    }
  }

  /**
   * Autenticación con GitHub OAuth
   * Si el usuario no existe, lo crea automáticamente
   */
  async githubLogin(profile: {
    id: string;
    username: string;
    displayName: string;
    emails?: Array<{ value: string }>;
  }): Promise<AuthResponseDto> {
    try {
      const email =
        profile.emails?.[0]?.value || `${profile.username}@github.com`;
      const auth2Id = profile.id;

      this.logger.log(
        `GitHub login attempt para: ${email} (auth2Id: ${auth2Id})`,
      );

      // Buscar usuario por email
      let user = await DbContext.user.findUnique({
        where: { email },
      });

      // Si el usuario existe pero no tiene auth2Id, actualizar
      if (user && !user.auth2Id) {
        user = await DbContext.user.update({
          where: { id: user.id },
          data: {
            auth2Id: auth2Id.toString(),
            verificado: true,
            updatedAt: new Date(),
          },
        });

        this.logger.log(`Auth2Id agregado al usuario existente: ${email}`);
      }

      // Si el usuario no existe, crear uno nuevo
      if (!user) {
        this.logger.log(`Creando nuevo usuario desde GitHub: ${email}`);

        user = await DbContext.user.create({
          data: {
            username: profile.username,
            email,
            auth2Id: auth2Id.toString(),
            verificado: true, // Los usuarios de GitHub se consideran verificados
            activo: true,
            contrasena: null, // Usuario de OAuth no tiene contraseña local
            createdAt: new Date(),
            updatedAt: new Date(),
            role: {
              connect: { name: 'USER' },
            },
          },
        });
      } else {
        // Actualizar último acceso
        await DbContext.user.update({
          where: { id: user.id },
          data: { updatedAt: new Date() },
        });
      }

      // Generar token JWT
      const token = this.generateToken(user);

      this.logger.log(`GitHub login exitoso para: ${email}`);

      return {
        id: user.id,
        username: user.username,
        email: user.email || '',
        telefono: user.telefono,
        access_token: token,
        token_type: 'Bearer',
        expires_in: 24 * 60 * 60,
      };
    } catch (error) {
      this.logger.error(
        `Error en GitHub login para: ${profile.username}`,
        error instanceof Error ? error.message : 'Unknown error',
      );

      throw new BadRequestException('Error en autenticación GitHub');
    }
  }

  /**
   * Generar token JWT
   */
  private generateToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email ?? '',
      username: user.username,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
      expiresIn: '24h',
    });

    return token;
  }

  /**
   * Validar token JWT (usado por JwtStrategy)
   */
  async validateJwtPayload(payload: JwtPayload): Promise<User | null> {
    try {
      const user = await DbContext.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user || !user.activo) {
        return null;
      }

      return user;
    } catch (error) {
      this.logger.error('Error validando JWT payload', error);
      return null;
    }
  }

  /**
   * Obtener usuario con su relación de rol
   */
  async getUserWithRole(
    userId: string,
  ): Promise<(User & { role: { name: string } | null }) | null> {
    try {
      const user = await DbContext.user.findUnique({
        where: { id: userId },
        include: { role: true },
      });

      return user;
    } catch (error) {
      this.logger.error(
        `Error obteniendo usuario con rol: ${userId}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }
}
