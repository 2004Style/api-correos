import { Injectable, Logger } from '@nestjs/common';
import { User } from 'prisma/generated/prisma';
import { DbContext } from 'src/context/db-context';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import {
  PaginationDto,
  PaginatedResponse,
  calculatePaginationInfo,
} from 'src/shared/pagination.dto';
import { buildUserSearchFilter } from 'src/shared/search-filters';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  async createUser(body: UserCreateDto): Promise<User | null> {
    try {
      this.logger.log(`Creando usuario: ${body.username}`);
      return await DbContext.user.create({
        data: {
          username: body.username,
          email: body.email ?? null,
          telefono: body.telefono ?? null,
          auth2Id: body.auth2Id ?? null,
          verificado: body.auth2Id ? true : false,
          contrasena: body.contrasena ?? null,
          activo: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: { connect: { name: body.roleName } },
        },
      });
    } catch (error) {
      this.logger.error(
        `Error al crear usuario: ${body.username}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async getUsers(pagination: PaginationDto): Promise<PaginatedResponse<User>> {
    try {
      this.logger.log(
        `Obteniendo usuarios - page: ${pagination.page}, limit: ${pagination.limit}, search: ${pagination.search || 'none'}`,
      );

      const where = buildUserSearchFilter(pagination.search);

      const total = await DbContext.user.count({ where });

      const data = await DbContext.user.findMany({
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
        'Error al obtener usuarios',
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

  async getUserById(id: string): Promise<User | null> {
    try {
      this.logger.log(`Obteniendo usuario con id: ${id}`);
      return await DbContext.user.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al obtener usuario con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async updateUser(id: string, body: UserUpdateDto): Promise<User | null> {
    try {
      this.logger.log(`Actualizando usuario con id: ${id}`);
      return await DbContext.user.update({
        where: { id },
        data: {
          username: body.username,
          email: body.email,
          telefono: body.telefono,
          auth2Id: body.auth2Id,
          contrasena: body.contrasena,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(
        `Error al actualizar usuario con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async deleteUser(id: string): Promise<User | null> {
    try {
      this.logger.log(`Eliminando usuario con id: ${id}`);
      return await DbContext.user.delete({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al eliminar usuario con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }
}
