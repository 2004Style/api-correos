// ============================================
// app.dto.ts
// ============================================
import {
  IsString,
  IsEmail,
  IsOptional,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttachmentDto {
  @IsOptional()
  @IsString()
  filename?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsString()
  contentType?: string;

  @IsOptional()
  @IsString()
  cid?: string;

  @IsOptional()
  @IsString()
  encoding?: string;
}

/**
 * DTO para envío de correos
 * Solo contiene el CONTENIDO del correo, no la configuración SMTP
 * La configuración (host, puerto, credenciales) está en variables de entorno
 */
export class SendMailDto {
  @IsNotEmpty({ message: 'El campo "to" es requerido' })
  @IsEmail({}, { each: true, message: 'Formato de email inválido en "to"' })
  to!: string | string[];

  @IsOptional()
  @IsEmail({}, { each: true, message: 'Formato de email inválido en "cc"' })
  cc?: string | string[];

  @IsOptional()
  @IsEmail({}, { each: true, message: 'Formato de email inválido en "bcc"' })
  bcc?: string | string[];

  @IsOptional()
  @IsEmail({}, { message: 'Formato de email inválido en "replyTo"' })
  replyTo?: string;

  @IsNotEmpty({ message: 'El campo "subject" es requerido' })
  @IsString()
  subject!: string;

  @ValidateIf((o: SendMailDto) => !o.html)
  @IsNotEmpty({ message: 'Debe proporcionar "text" o "html"' })
  @IsString()
  text?: string;

  @ValidateIf((o: SendMailDto) => !o.text)
  @IsNotEmpty({ message: 'Debe proporcionar "text" o "html"' })
  @IsString()
  html?: string;

  @IsOptional()
  headers?: Record<string, string>;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttachmentDto)
  attachments?: AttachmentDto[];
}
