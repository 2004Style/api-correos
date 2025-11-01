import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para marcar rutas como públicas
 * Las rutas marcadas con @Public() no requieren autenticación
 *
 * @example
 * @Get('public-info')
 * @Public()
 * getPublicInfo() {
 *   return { message: 'Esta ruta es pública' };
 * }
 */
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
