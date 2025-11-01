import { Injectable } from '@nestjs/common';
import { MailService } from './mail/mail.service';

@Injectable()
export class AppService {
  protected readonly _service: MailService;

  constructor(_service: MailService) {
    this._service = _service;
  }

  getSaludo(): {
    service: string;
    status: string;
    configured: boolean;
    from: string;
  } {
    return this._service.getServiceInfo();
  }
}
