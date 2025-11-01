import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty({ message: 'El campo "username" es requerido' })
  @IsString({ message: 'El campo "username" debe ser un string' })
  @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El username no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'El username solo puede contener letras, números, guiones y guiones bajos',
  })
  username!: string;

  @IsOptional()
  @IsEmail({}, { message: 'El campo "email" debe ser un email válido' })
  email?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "telefono" debe ser un string' })
  @Matches(/^[0-9+\-() ]+$/, {
    message: 'El teléfono contiene caracteres no válidos',
  })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  telefono?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "auth2Id" debe ser un string' })
  @MaxLength(100, { message: 'El auth2Id no puede exceder 100 caracteres' })
  auth2Id?: string;

  @IsOptional()
  @IsString({ message: 'El campo "contrasena" debe ser un string' })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  @MaxLength(255, { message: 'La contraseña no puede exceder 255 caracteres' })
  contrasena?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "confirmaContrasena" debe ser un string' })
  confirmaContrasena?: string | null;

  @IsNotEmpty({ message: 'El campo "roleName" es requerido' })
  @IsString({ message: 'El campo "roleName" debe ser un string' })
  @MinLength(1, { message: 'El roleName no puede estar vacío' })
  roleName!: string;
}

export class UserUpdateDto {
  @IsOptional()
  @IsString({ message: 'El campo "username" debe ser un string' })
  @MinLength(3, { message: 'El username debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El username no puede exceder 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'El username solo puede contener letras, números, guiones y guiones bajos',
  })
  username?: string;

  @IsOptional()
  @IsEmail({}, { message: 'El campo "email" debe ser un email válido' })
  email?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "telefono" debe ser un string' })
  @Matches(/^[0-9+\-() ]+$/, {
    message: 'El teléfono contiene caracteres no válidos',
  })
  @MaxLength(15, { message: 'El teléfono no puede exceder 15 caracteres' })
  telefono?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "auth2Id" debe ser un string' })
  @MaxLength(100, { message: 'El auth2Id no puede exceder 100 caracteres' })
  auth2Id?: string;

  @IsOptional()
  @IsString({ message: 'El campo "contrasena" debe ser un string' })
  @MinLength(8, {
    message: 'La contraseña debe tener al menos 8 caracteres',
  })
  @MaxLength(255, { message: 'La contraseña no puede exceder 255 caracteres' })
  contrasena?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "confirmaContrasena" debe ser un string' })
  confirmaContrasena?: string | null;

  @IsOptional()
  @IsString({ message: 'El campo "roleName" debe ser un string' })
  @MinLength(1, { message: 'El roleName no puede estar vacío' })
  roleName?: string;
}

export class UserResponseDto {
  id!: string;
  username!: string;
  email?: string | null;
  telefono?: string | null;
  verificado!: boolean;
  activo!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
