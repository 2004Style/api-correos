import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RolesCreateDto {
  @IsNotEmpty({ message: 'El campo "name" es requerido' })
  @IsString({ message: 'El campo "name" debe ser un string' })
  @MinLength(1, { message: 'El name no puede estar vacío' })
  @MaxLength(50, { message: 'El name no puede exceder 50 caracteres' })
  name!: string;
}

export class RolesUpdateDto {
  @IsOptional()
  @IsString({ message: 'El campo "name" debe ser un string' })
  @MinLength(1, { message: 'El name no puede estar vacío' })
  @MaxLength(50, { message: 'El name no puede exceder 50 caracteres' })
  name?: string;
}

export class RolesResponseDto {
  id!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
