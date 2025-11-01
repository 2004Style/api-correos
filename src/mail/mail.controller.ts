import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseGuards,
} from '@nestjs/common';
import type { EmailResult } from './mail.interface';
import { SendMailDto } from './mail.dto';
import { MailService } from './mail.service';
import { MailAuthGuard } from '../guard/mail.guard';
import { Public } from '../guard/public.decorator';

interface SuccessResponse {
  ok: true;
  result: EmailResult;
}

interface ErrorResponse {
  ok: false;
  message: string;
  error: string;
}

@Controller('mail')
export class MailController {
  private readonly logger = new Logger(MailController.name);

  constructor(private readonly appService: MailService) {}

  /**
   * Enviar correo electrónico
   * POST /mail
   * Requiere: X-Client-Id y X-Secret-Key en headers (credenciales de aplicación)
   * MailAuthGuard valida las credenciales automáticamente
   */
  @Post()
  @UseGuards(MailAuthGuard)
  @Public() // Saltamos AuthGuard global para permitir acceso sin JWT
  async sendMail(@Body() mailContent: SendMailDto): Promise<SuccessResponse> {
    try {
      const recipient = Array.isArray(mailContent.to)
        ? mailContent.to.join(', ')
        : String(mailContent.to);
      this.logger.log(`Sending email to: ${recipient}`);
      const result = await this.appService.sendMail(mailContent);

      return { ok: true, result };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';

      this.logger.error('Failed to send email', errorMessage);

      const response: ErrorResponse = {
        ok: false,
        message: 'Error al enviar el correo',
        error: errorMessage,
      };

      throw new HttpException(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
