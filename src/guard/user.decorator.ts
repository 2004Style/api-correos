/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { User as UserType } from 'prisma/generated/prisma';

/**
 * Decorador para inyectar el usuario autenticado en los controladores
 * Se usa después de la autenticación con AuthGuard
 *
 * @param data - Campo específico del usuario a extraer (opcional)
 *
 * @example
 * // Obtener el usuario completo
 * @Get('profile')
 * getProfile(@User() user: User) {
 *   return user;
 * }
 *
 * @example
 * // Obtener solo el email del usuario
 * @Get('email')
 * getEmail(@User('email') email: string) {
 *   return { email };
 * }
 */
export const User = createParamDecorator(
  (data: keyof UserType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = (request as Record<string, UserType>).user;

    if (!user) {
      return undefined;
    }

    return data ? user[data] : user;
  },
);
