import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

/**
 * DTO para registro de nuevo usuario
 */
export class RegisterDto {
  @IsNotEmpty({ message: 'El campo "username" es requerido' })
  @IsString({ message: 'El campo "username" debe ser un string' })
  @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El username no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'El username solo puede contener letras, números, guiones y guiones bajos',
  })
  username!: string;

  @IsNotEmpty({ message: 'El campo "email" es requerido' })
  @IsEmail({}, { message: 'El campo "email" debe ser un email válido' })
  email!: string;

  @IsOptional()
  @IsString({ message: 'El campo "telefono" debe ser un string' })
  @Matches(/^[0-9+\-() ]+$/, {
    message: 'El teléfono contiene caracteres no válidos',
  })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  telefono?: string;

  @IsNotEmpty({ message: 'El campo "contrasena" es requerido' })
  @IsString({ message: 'El campo "contrasena" debe ser un string' })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  @MaxLength(255, { message: 'La contraseña no puede exceder 255 caracteres' })
  contrasena!: string;

  @IsNotEmpty({ message: 'El campo "confirmaContrasena" es requerido' })
  @IsString({ message: 'El campo "confirmaContrasena" debe ser un string' })
  confirmaContrasena!: string;
}

/**
 * DTO para login de usuario
 */
export class LoginDto {
  @IsNotEmpty({ message: 'El campo "email" es requerido' })
  @IsEmail({}, { message: 'El campo "email" debe ser un email válido' })
  email!: string;

  @IsNotEmpty({ message: 'El campo "contrasena" es requerido' })
  @IsString({ message: 'El campo "contrasena" debe ser un string' })
  contrasena!: string;
}

/**
 * DTO de respuesta con token JWT
 */
export class AuthResponseDto {
  id!: string;
  username!: string;
  email!: string;
  telefono?: string | null;
  access_token!: string;
  token_type: string = 'Bearer';
  expires_in!: number;
}

/**
 * Payload del JWT
 */
export interface JwtPayload {
  sub: string; // user id
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}
