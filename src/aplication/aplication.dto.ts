import {
  IsString,
  IsUUID,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

export class AppliactionCreateDto {
  @IsNotEmpty({ message: 'El campo "name" es requerido' })
  @IsString({ message: 'El campo "name" debe ser un string' })
  @MinLength(3, {
    message: 'El nombre debe tener al menos 3 caracteres',
  })
  @MaxLength(100, {
    message: 'El nombre no puede exceder 100 caracteres',
  })
  name!: string;

  @IsNotEmpty({ message: 'El campo "userId" es requerido' })
  @IsUUID('4', { message: 'El campo "userId" debe ser un UUID válido' })
  userId!: string;
}

export class AppliactionResponseDto {
  id!: string;
  name!: string;
  userId!: string;
  clientId!: string;
  activo!: boolean;
  suspended!: boolean;
  rateLimit!: number;
  dailyLimit!: number;
  createdAt!: Date;
  updatedAt!: Date;
  lastUsedAt?: Date | null;
}
