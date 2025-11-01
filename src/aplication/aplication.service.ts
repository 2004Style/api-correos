import { Injectable, Logger } from '@nestjs/common';
import { Application } from 'prisma/generated/prisma';
import { DbContext } from 'src/context/db-context';
import { AppliactionCreateDto } from './aplication.dto';
import { generateClientId, generateSecretKey } from 'src/shared/generators';
import { hash } from 'bcrypt';
import {
  PaginationDto,
  PaginatedResponse,
  calculatePaginationInfo,
} from 'src/shared/pagination.dto';
import { buildApplicationSearchFilter } from 'src/shared/search-filters';

@Injectable()
export class AplicationService {
  private readonly logger = new Logger(AplicationService.name);

  async createApplication(
    body: AppliactionCreateDto,
  ): Promise<Application | null> {
    try {
      const clientId = generateClientId();
      const secretKey = generateSecretKey();

      console.log('Generated clientId:', clientId);
      console.log('Generated secretKey:', secretKey);

      // Hashear el secret key antes de guardarlo
      const hashedSecret = await hash(secretKey, 10);

      this.logger.log(
        `Creando aplicación: ${body.name} para usuario: ${body.userId}`,
      );

      const data: Omit<Application, 'id'> = {
        name: body.name,
        userId: body.userId,
        clientId,
        secretKey: hashedSecret,
        activo: true,
        suspended: false,
        rateLimit: 1000,
        dailyLimit: 10000,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastUsedAt: new Date(),
      };
      const response = await DbContext.application.create({ data: data });

      // IMPORTANTE: Devolver el secretKey original solo en la creación
      // El cliente debe guardarlo de forma segura en este momento
      // No se puede recuperar después porque está hasheado en la BD
      return {
        ...response,
        secretKey: secretKey,
      };
    } catch (error) {
      this.logger.error(
        `Error al crear aplicación: ${body.name}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async getApplications(
    pagination: PaginationDto,
  ): Promise<PaginatedResponse<Application>> {
    try {
      this.logger.log(
        `Obteniendo aplicaciones - page: ${pagination.page}, limit: ${pagination.limit}, search: ${pagination.search || 'none'}`,
      );

      const where = buildApplicationSearchFilter(pagination.search);

      const total = await DbContext.application.count({ where });

      // Obtener las aplicaciones paginadas
      const data = await DbContext.application.findMany({
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
        'Error al obtener aplicaciones',
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

  async getApplicationById(id: string): Promise<Application | null> {
    try {
      this.logger.log(`Obteniendo aplicación con id: ${id}`);
      return await DbContext.application.findUnique({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al obtener aplicación con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async getUserApplications(userId: string): Promise<Application[]> {
    try {
      this.logger.log(`Obteniendo aplicaciones del usuario: ${userId}`);
      return await DbContext.application.findMany({
        where: {
          userId: userId,
        },
      });
    } catch (error) {
      this.logger.error(
        `Error al obtener aplicaciones del usuario: ${userId}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return [];
    }
  }

  async inactiveApplication(id: string): Promise<Application | null> {
    try {
      this.logger.log(`Desactivando aplicación con id: ${id}`);
      return await DbContext.application.update({
        where: { id },
        data: {
          activo: false,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(
        `Error al desactivar aplicación con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async suspendApplication(id: string): Promise<Application | null> {
    try {
      this.logger.log(`Suspendiendo aplicación con id: ${id}`);
      return await DbContext.application.update({
        where: { id },
        data: {
          suspended: true,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      this.logger.error(
        `Error al suspender aplicación con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  async deleteApplication(id: string): Promise<Application | null> {
    try {
      this.logger.log(`Eliminando aplicación con id: ${id}`);
      return await DbContext.application.delete({ where: { id } });
    } catch (error) {
      this.logger.error(
        `Error al eliminar aplicación con id: ${id}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  /**
   * Obtener aplicación por clientId
   * Se usa en el MailAuthGuard para validar credenciales
   */
  async getApplicationByClientId(
    clientId: string,
  ): Promise<Application | null> {
    try {
      this.logger.debug(`Buscando aplicación con clientId: ${clientId}`);
      return await DbContext.application.findUnique({
        where: { clientId },
      });
    } catch (error) {
      this.logger.error(
        `Error al obtener aplicación por clientId: ${clientId}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
      return null;
    }
  }

  /**
   * Actualizar el timestamp de último uso
   */
  async updateLastUsed(applicationId: string): Promise<void> {
    try {
      await DbContext.application.update({
        where: { id: applicationId },
        data: { lastUsedAt: new Date() },
      });
    } catch (error) {
      this.logger.error(
        `Error actualizando lastUsedAt para aplicación: ${applicationId}`,
        error instanceof Error ? error.message : 'Unknown error',
      );
    }
  }
}
