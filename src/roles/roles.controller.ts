import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesCreateDto, RolesUpdateDto } from './roles.dto';
import { User } from '../guard/user.decorator';
import type { Role } from 'prisma/generated/prisma';
import type { User as UserType } from 'prisma/generated/prisma';
import {
  PaginationDto,
  type PaginatedResponse,
} from 'src/shared/pagination.dto';

@Controller('roles')
export class RolesController {
  private readonly _service: RolesService;

  constructor(service: RolesService) {
    this._service = service;
  }

  /**
   * Crear nuevo rol
   * POST /roles
   * Accesible solo para usuarios autenticados (ADMIN por defecto)
   * Nota: No necesitamos @Roles('ADMIN') porque:
   * - El guard global protege la ruta (requiere autenticación)
   * - ADMIN tiene acceso automático a cualquier ruta protegida
   * - Otros roles necesitarían @Roles() solo si queremos permitirles
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRole(
    @Body() body: RolesCreateDto,
    @User() admin: UserType,
  ): Promise<Role | null> {
    console.log(`Admin ${admin.email} creando rol: ${body.name}`);
    return await this._service.createRole({
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Obtener todos los roles con paginación y búsqueda
   * GET /roles?page=1&limit=10&search=admin
   * Accesible para usuarios autenticados
   */
  @Get()
  async getRoles(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedResponse<Role>> {
    const pagination = new PaginationDto();
    if (page) pagination.page = parseInt(page, 10);
    if (limit) pagination.limit = parseInt(limit, 10);
    if (search) pagination.search = search;

    return await this._service.getRoles(pagination);
  }

  /**
   * Obtener rol por ID
   * GET /roles/:id
   * Accesible para usuarios autenticados
   */
  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<Role | null> {
    return this._service.getRoleById(id);
  }

  /**
   * Actualizar rol
   * PUT /roles/:id
   * Accesible solo para usuarios autenticados (ADMIN por defecto)
   */
  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() body: RolesUpdateDto,
    @User() admin: UserType,
  ): Promise<Role | null> {
    console.log(`Admin ${admin.email} actualizando rol: ${id}`);
    return this._service.updateRole(id, {
      id,
      name: body.name ?? '',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  /**
   * Eliminar rol
   * DELETE /roles/:id
   * Accesible solo para usuarios autenticados (ADMIN por defecto)
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRole(
    @Param('id') id: string,
    @User() admin: UserType,
  ): Promise<Role | null> {
    console.log(`Admin ${admin.email} eliminando rol: ${id}`);
    return this._service.deleteRole(id);
  }
}
