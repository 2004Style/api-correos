import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Request } from 'express';
import { AplicationService } from '../aplication/aplication.service';
import { compare } from 'bcrypt';
import type { Application } from 'prisma/generated/prisma';

/**
 * Guard para proteger el endpoint de envío de correos
 * Valida que el cliente envíe el clientId y secretKey válidos
 *
 * El cliente debe enviar en el header de la solicitud:
 * - X-Client-Id: El ID único de la aplicación
 * - X-Secret-Key: La clave secreta de la aplicación
 *
 * @example
 * // En un controlador:
 * @Post('send')
 * @UseGuards(MailAuthGuard)
 * async sendMail(@Body() mailContent: SendMailDto) {
 *   return this.mailService.sendMail(mailContent);
 * }
 *
 * @example
 * // Request con curl:
 * curl -X POST http://localhost:3000/mail \
 *   -H "Content-Type: application/json" \
 *   -H "X-Client-Id: cli_a1b2c3d4e5f6..." \
 *   -H "X-Secret-Key: sk_live_a1b2c3d4e5f6..." \
 *   -d '{"to":"test@example.com","subject":"Test","text":"Hello"}'
 */
@Injectable()
export class MailAuthGuard implements CanActivate {
  private readonly logger = new Logger(MailAuthGuard.name);

  constructor(private readonly applicationService: AplicationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const clientId = request.headers['x-client-id'] as string;
    const secretKey = request.headers['x-secret-key'] as string;

    // Validar que ambos valores estén presentes
    if (!clientId || !secretKey) {
      this.logger.warn('Intento de acceso sin credenciales de aplicación');
      throw new UnauthorizedException(
        'Credenciales de aplicación requeridas (X-Client-Id y X-Secret-Key)',
      );
    }

    try {
      // Obtener la aplicación por clientId
      const application =
        await this.applicationService.getApplicationByClientId(clientId);

      if (!application) {
        this.logger.warn(`ClientId inválido: ${clientId}`);
        throw new UnauthorizedException('ClientId no válido');
      }

      // Verificar que la aplicación esté activa
      if (!application.activo) {
        this.logger.warn(`Aplicación inactiva: ${clientId}`);
        throw new UnauthorizedException('La aplicación no está activa');
      }

      // Verificar que la aplicación no esté suspendida
      if (application.suspended) {
        this.logger.warn(`Aplicación suspendida: ${clientId}`);
        throw new UnauthorizedException('La aplicación está suspendida');
      }

      // Comparar el secretKey hasheado
      const secretKeyValid = await compare(secretKey, application.secretKey);

      if (!secretKeyValid) {
        this.logger.warn(`SecretKey inválido para clientId: ${clientId}`);
        throw new UnauthorizedException('SecretKey no válido');
      }

      // Guardar la aplicación en la request para usarla después
      (request as unknown as Record<string, Application>).application =
        application;
      (request as unknown as Record<string, string>).clientId = clientId;

      // Registrar el último uso de la aplicación
      await this.applicationService.updateLastUsed(application.id);

      this.logger.debug(
        `Acceso autorizado para aplicación: ${application.name}`,
      );
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      this.logger.error(
        `Error validando credenciales: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new BadRequestException('Error validando credenciales');
    }

    return true;
  }
}
