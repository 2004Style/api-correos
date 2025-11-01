import type { Prisma } from 'prisma/generated/prisma';

/**
 * Constructor de filtros tipados para búsqueda de usuarios
 * Usa la API de Prisma con tipos seguros
 */
export function buildUserSearchFilter(search?: string): Prisma.UserWhereInput {
  if (!search) {
    return {};
  }

  return {
    OR: [
      { username: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { telefono: { contains: search, mode: 'insensitive' } },
    ],
  };
}

/**
 * Constructor de filtros tipados para búsqueda de roles
 * Usa la API de Prisma con tipos seguros
 */
export function buildRoleSearchFilter(search?: string): Prisma.RoleWhereInput {
  if (!search) {
    return {};
  }

  return {
    name: { contains: search, mode: 'insensitive' },
  };
}

/**
 * Constructor de filtros tipados para búsqueda de aplicaciones
 * Usa la API de Prisma con tipos seguros
 */
export function buildApplicationSearchFilter(
  search?: string,
): Prisma.ApplicationWhereInput {
  if (!search) {
    return {};
  }

  return {
    OR: [
      { name: { contains: search, mode: 'insensitive' } },
      { clientId: { contains: search, mode: 'insensitive' } },
    ],
  };
}
