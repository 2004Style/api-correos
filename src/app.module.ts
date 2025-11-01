import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesModule } from './roles/roles.module';
import { UserModule } from './user/user.module';
import { MailService } from './mail/mail.service';
import { MailModule } from './mail/mail.module';
import { AplicationService } from './aplication/aplication.service';
import { AplicationModule } from './aplication/aplication.module';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [AuthModule, RolesModule, UserModule, MailModule, AplicationModule],
  controllers: [AppController],
  providers: [
    AppService,
    MailService,
    AplicationService,
    // Registrar AuthGuard globalmente para proteger todas las rutas automaticamente
    // Usa @Public() para rutas públicas
    // Usa @Roles('ROLE') para roles específicos
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
