import {
  IsOptional,
  IsInt,
  Min,
  Max,
  IsString,
  IsPositive,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * DTO para parámetros de paginación y búsqueda
 * Se usa en todos los listados (users, roles, applications)
 *
 * @example
 * GET /users?page=1&limit=10&search=john
 * GET /roles?page=2&limit=20&search=admin
 * GET /aplication?page=1&limit=15&search=my-app
 */
export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El campo "page" debe ser un número entero' })
  @IsPositive({ message: 'El campo "page" debe ser mayor a 0' })
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El campo "limit" debe ser un número entero' })
  @Min(1, { message: 'El limit debe ser mínimo 1' })
  @Max(100, { message: 'El limit no puede exceder 100' })
  limit: number = 10;

  @IsOptional()
  @IsString({ message: 'El campo "search" debe ser un string' })
  search?: string;

  /**
   * Calcular el skip para la paginación
   */
  getSkip(): number {
    return (this.page - 1) * this.limit;
  }
}

/**
 * Interfaz genérica para respuestas paginadas
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

/**
 * Función auxiliar para calcular información de paginación
 */
export function calculatePaginationInfo(
  total: number,
  page: number,
  limit: number,
): PaginatedResponse<any>['pagination'] {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
}
