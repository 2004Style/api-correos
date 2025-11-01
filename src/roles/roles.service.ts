import { Injectable, Logger } from '@nestjs/common';
import { DbContext } from '../context/db-context';
import { Role } from '../../prisma/generated/prisma/client';
import {
  PaginationDto,
  PaginatedResponse,
  calculatePaginationInfo,
} from 'src/shared/pagination.dto';
import { buildRoleSearchFilter } from 'src/shared/search-filters';

@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name);

  async createRole(body: Omit<Role, 'id'>): Promise<Role | null> {
    try {
      this.logger.log(`Creando rol: ${body.name}`);
      return await DbContext.role.create({ data: body });
    } catch (error) {
      this.logger.error(
        `Error al crear rol: ${body.name}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async getRoles(pagination: PaginationDto): Promise<PaginatedResponse<Role>> {
    try {
      this.logger.log(
        `Obteniendo roles - page: ${pagination.page}, limit: ${pagination.limit}, search: ${pagination.search || 'none'}`,
      );

      const where = buildRoleSearchFilter(pagination.search);

      const total = await DbContext.role.count({ where });

      const data = await DbContext.role.findMany({
        where,
        skip: pagination.getSkip(),
        take: pagination.limit,
        orderBy: { createdAt: 'desc' },
      });

      return {
        data,
        pagination: calculatePaginationInfo(
          total,
          pagination.page,
          pagination.limit,
        ),
      };
    } catch (error) {
      this.logger.error(
        'Error al obtener roles',
        error instanceof Error ? error.message : 'Unknown error',
      );
      return {
        data: [],
        pagination: calculatePaginationInfo(
          0,
          pagination.page,
          pagination.limit,
        ),
      };
    }
  }

  async getRoleById(id: string): Promise<Role | null> {
    try {
      this.logger.log(`Obteniendo rol con id: ${id}`);
      return await DbContext.role.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al obtener rol con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async updateRole(id: string, body: Role): Promise<Role | null> {
    try {
      this.logger.log(`Actualizando rol con id: ${id}`);
      return await DbContext.role.update({ where: { id }, data: body });
    } catch (error) {
      this.logger.error(
        `Error al actualizar rol con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async deleteRole(id: string): Promise<Role | null> {
    try {
      this.logger.log(`Eliminando rol con id: ${id}`);
      return await DbContext.role.delete({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al eliminar rol con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }
}
