/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';
import { IS_PUBLIC_KEY } from './public.decorator';
import { ROLES_KEY } from './roles.decorator';

/** ==== INTERFAZ PARA TIPAR EL PAYLOAD ==== */
export interface UserPayload {
  sub: string;
  email: string;
  username: string;
}

/**
 * Guard de autenticación global
 * Lógica de protección:
 * 1. Rutas públicas: marcadas con @Public() - sin validación
 * 2. Rutas privadas sin decorador: accesibles solo autenticados
 *    - ADMIN: acceso total automático
 *    - Otros roles: acceso permitido
 * 3. Rutas con @Roles(): solo roles especificados pueden acceder
 *    - ADMIN: siempre tiene acceso (bypass automático)
 *    - Otros roles: solo si están en la lista de @Roles()
 * Ejemplo:
 * - @Get('users') → accesible para cualquier usuario autenticado
 * - @Post('users') @Roles('SUPERVISOR', 'ADMIN') → solo ADMIN o SUPERVISOR
 * - @Get('info') @Public() → accesible sin autenticación
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Verificar si la ruta es pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      this.logger.debug('Acceso permitido a ruta pública');
      return true;
    }

    // Obtener los roles requeridos
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    try {
      if (!token) {
        this.logger.warn('Token no encontrado en la solicitud');
        throw new UnauthorizedException('Token no encontrado');
      }

      // Verificar y decodificar el JWT
      const payload = await this.jwtService.verifyAsync<UserPayload>(token, {
        secret: process.env.JWT_SECRET || 'your-secret-key-change-this',
        ignoreExpiration: false,
      });

      // Obtener el usuario desde la BD
      const user = await this.authService.validateJwtPayload({
        sub: payload.sub,
        email: payload.email,
        username: payload.username,
      });

      if (!user) {
        this.logger.warn(`Usuario no encontrado: ${payload.email}`);
        throw new UnauthorizedException('Usuario no válido');
      }

      // Verificar roles si es necesario
      if (requiredRoles && requiredRoles.length > 0) {
        // Cargar la relación del rol si no está cargada
        const userWithRole = await this.authService.getUserWithRole(user.id);

        if (!userWithRole?.role?.name) {
          this.logger.warn(`Rol no encontrado para usuario: ${user.email}`);
          throw new ForbiddenException('Usuario sin rol asignado');
        }

        // ADMIN tiene acceso total a cualquier ruta protegida
        if (userWithRole.role.name === 'ADMIN') {
          this.logger.debug(
            `Admin ${user.email} acceso permitido a ruta protegida`,
          );
          // No hace falta validar otros roles, el admin puede acceder
        } else if (!requiredRoles.includes(userWithRole.role.name)) {
          // Para otros roles, validar que estén en la lista permitida
          this.logger.warn(
            `Acceso denegado para usuario ${user.email} con rol ${userWithRole.role.name}`,
          );
          throw new ForbiddenException(
            'No tienes permiso para acceder a este recurso',
          );
        }
      }

      // Guardar el usuario en la request
      (request as unknown as Record<string, unknown>).user = user;
      this.logger.debug(`Usuario autenticado: ${user.email}`);
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      this.logger.error(
        `Error en autenticación: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new UnauthorizedException('Token inválido o expirado');
    }

    return true;
  }

  /**
   * Extrae el token del header Authorization o de cookies
   */
  private extractToken(request: Request): string | undefined {
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.slice(7);
    }

    // Intenta obtener el token de las cookies
    return (request.cookies?.authToken as string | undefined) ?? undefined;
  }
}
