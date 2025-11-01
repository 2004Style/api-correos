import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Logger,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, AuthResponseDto } from './auth.dto';
import { GitHubAuthGuard } from '../guard/github.guard';
import { Public } from '../guard/public.decorator';
import { User } from '../guard/user.decorator';
import type { Response, Request } from 'express';
import type { User as UserType } from 'prisma/generated/prisma';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  /**
   * Registro de nuevo usuario
   * POST /auth/register
   * Ruta PÚBLICA - No requiere autenticación
   */
  @Post('register')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    this.logger.log(`Register attempt for: ${registerDto.email}`);
    return await this.authService.register(registerDto);
  }

  /**
   * Login con email y contraseña
   * POST /auth/login
   * Ruta PÚBLICA - No requiere autenticación
   */
  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    this.logger.log(`Login attempt for: ${loginDto.email}`);
    return await this.authService.login(loginDto);
  }

  /**
   * Iniciar autenticación con GitHub
   * GET /auth/github
   * Ruta PÚBLICA - Redirige a GitHub
   */
  @Get('github')
  @Public()
  @UseGuards(GitHubAuthGuard)
  async githubAuth(): Promise<void> {
    // Guard redirige a GitHub
  }

  /**
   * Callback de GitHub OAuth
   * GET /auth/github/callback
   * Ruta PÚBLICA - Recibe callback de GitHub
   */
  @Get('github/callback')
  @Public()
  @UseGuards(GitHubAuthGuard)
  githubCallback(@Req() req: Request, @Res() res: Response): void {
    try {
      const authResponse = req.user as unknown as AuthResponseDto;

      this.logger.log(`GitHub callback successful for: ${authResponse.email}`);

      // Retornar el token en la respuesta
      // Opción 1: Redirigir a frontend con token en URL
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const redirectUrl = `${frontendUrl}/auth/callback?token=${authResponse.access_token}&user=${encodeURIComponent(JSON.stringify(authResponse))}`;

      res.redirect(redirectUrl);
    } catch (error) {
      this.logger.error('GitHub callback error', error);
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      res.redirect(`${frontendUrl}/auth/error`);
    }
  }

  /**
   * Obtener perfil del usuario autenticado
   * GET /auth/profile
   * Ruta PRIVADA - Requiere autenticación (AuthGuard está registrado globalmente)
   */
  @Get('profile')
  getProfile(@User() user: UserType) {
    return user;
  }
}
