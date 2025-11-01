import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';

/**
 * Guard personalizado para GitHub OAuth
 * Extiende el guard de Passport para manejar la autenticación con GitHub
 *
 * Se usa en los endpoints de autenticación con GitHub:
 * - GET /auth/github - Inicia el login con GitHub
 * - GET /auth/github/callback - Callback después del login
 *
 * @example
 * @Get('github')
 * @UseGuards(GitHubAuthGuard)
 * async githubAuth(): Promise<void> {
 *   // Passport redirige automáticamente a GitHub
 * }
 *
 * @Get('github/callback')
 * @UseGuards(GitHubAuthGuard)
 * async githubCallback(
 *   @Req() req: Request,
 *   @Res() res: Response,
 * ): Promise<void> {
 *   const user = req.user;
 *   // Manejar la respuesta después del callback
 * }
 */
@Injectable()
export class GitHubAuthGuard
  extends PassportAuthGuard('github')
  implements CanActivate
{
  private readonly logger = new Logger(GitHubAuthGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Validar que las variables de entorno necesarias estén configuradas
    const clientId = process.env.GITHUB_CLIENT_ID;
    const clientSecret = process.env.GITHUB_CLIENT_SECRET;
    const callbackUrl = process.env.GITHUB_CALLBACK_URL;

    if (!clientId || !clientSecret) {
      this.logger.error(
        'GitHub OAuth no está configurado correctamente (falta GITHUB_CLIENT_ID o GITHUB_CLIENT_SECRET)',
      );
      throw new UnauthorizedException('GitHub OAuth no está disponible');
    }

    if (!callbackUrl) {
      this.logger.warn(
        'GITHUB_CALLBACK_URL no configurado, usando valor por defecto',
      );
    }

    try {
      // Llamar al canActivate del guard de Passport
      const result = await super.canActivate(context);

      // El resultado puede ser boolean u Observable<boolean>
      if (typeof result === 'boolean') {
        return result;
      }

      // Si es una promesa o observable, se resuelve automáticamente
      return true;
    } catch (error) {
      this.logger.error(
        `Error en GitHubAuthGuard: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new UnauthorizedException(
        'Error durante la autenticación con GitHub',
      );
    }
  }

  handleRequest(err: any, user: any): any {
    // Manejar errores de Passport
    if (err || !user) {
      this.logger.warn('Falló la autenticación con GitHub');
      throw new UnauthorizedException('Autenticación con GitHub fallida');
    }

    return user;
  }
}
