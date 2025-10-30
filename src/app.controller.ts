// ============================================
// app.controller.ts
// ============================================
import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { AppService } from './app.service';
import type { EmailResult } from './mail.interface';
import { SendMailDto } from './app.dto';

interface SuccessResponse {
  ok: true;
  result: EmailResult;
}

interface ErrorResponse {
  ok: false;
  message: string;
  error: string;
}

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  getInfo(): {
    service: string;
    status: string;
    configured: boolean;
    from: string;
  } {
    return this.appService.getServiceInfo();
  }

  @Post('mail')
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
