import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { AplicationModule } from '../aplication/aplication.module';

@Module({
  imports: [AplicationModule],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
