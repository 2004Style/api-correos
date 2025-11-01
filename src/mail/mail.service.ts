/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import type { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';
import type { MailContent, EmailResult } from './mail.interface';
import 'dotenv/config';

@Injectable()
export class MailService implements OnModuleInit {
  private transporter: Transporter<SentMessageInfo> | null = null;
  private readonly logger = new Logger(MailService.name);
  private readonly defaultFrom: string;
  private readonly smtpConfigured: boolean = false;

  constructor() {
    // Configuración del remitente por defecto desde variables de entorno
    this.defaultFrom = process.env.MAIL_FROM ?? 'no-reply@example.com';
    this.smtpConfigured = this.initializeTransporter();
  }

  onModuleInit(): void {
    if (!this.smtpConfigured) {
      this.logger.warn('⚠️  SMTP not configured - emails will not be sent');
      this.logger.warn(
        '📝 Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env',
      );
    } else {
      this.logger.log('✅ SMTP configured successfully');
      this.logger.log(`📧 Default sender: ${this.defaultFrom}`);
    }
  }

  private initializeTransporter(): boolean {
    const host = process.env.SMTP_HOST!;
    const portStr = process.env.SMTP_PORT!;
    const user = process.env.SMTP_USER!;
    const pass = process.env.SMTP_PASS!;

    if (!host || !portStr) {
      return false;
    }

    const port = parseInt(portStr, 10);
    if (isNaN(port)) {
      this.logger.error(`Invalid SMTP_PORT: ${portStr}`);
      return false;
    }

    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    try {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: user && pass ? { user, pass } : undefined,
      });

      return true;
    } catch (error) {
      this.logger.error(
        'Failed to initialize SMTP transporter',
        error instanceof Error ? error.stack : String(error),
      );
      return false;
    }
  }

  getServiceInfo(): {
    service: string;
    status: string;
    configured: boolean;
    from: string;
  } {
    return {
      service: 'API de envío de correos electrónicos',
      status: this.smtpConfigured ? 'ready' : 'not configured',
      configured: this.smtpConfigured,
      from: this.defaultFrom,
    };
  }

  async sendMail(mailContent: MailContent): Promise<EmailResult> {
    if (!this.transporter) {
      throw new Error(
        'SMTP no configurado. Configure SMTP_HOST, SMTP_PORT, SMTP_USER y SMTP_PASS',
      );
    }

    const payload: SendMailOptions = {
      from: this.defaultFrom, // Siempre usa el remitente configurado en la API
      to: mailContent.to,
      cc: mailContent.cc,
      bcc: mailContent.bcc,
      replyTo: mailContent.replyTo,
      subject: mailContent.subject,
      text: mailContent.text,
      html: mailContent.html,
      headers: mailContent.headers,
      attachments: mailContent.attachments,
    };

    try {
      const info = await this.transporter.sendMail(payload);

      const result: EmailResult = {
        messageId: info.messageId,
        accepted: info.accepted as string[],
        rejected: info.rejected as string[],
        response: info.response,
        from: this.defaultFrom,
      };

      this.logger.log(`✅ Email sent: ${info.messageId}`);
      return result;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error('❌ Error sending email', errorStack ?? errorMessage);
      throw new Error(`Failed to send email: ${errorMessage}`);
    }
  }
}
