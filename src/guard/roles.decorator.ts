import { SetMetadata } from '@nestjs/common';

/**
 * Decorador para especificar los roles permitidos en una ruta
 * Se usa en conjunto con el AuthGuard
 *
 * @param roles - Nombres de los roles permitidos
 *
 * @example
 * @Get('admin-panel')
 * @Roles('ADMIN')
 * getAdminPanel() {
 *   return { message: 'Panel de administrador' };
 * }
 *
 * @example
 * @Get('user-area')
 * @Roles('ADMIN', 'USER')
 * getUserArea() {
 *   return { message: 'Área de usuario' };
 * }
 */
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
