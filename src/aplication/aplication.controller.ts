import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AplicationService } from './aplication.service';
import { AppliactionCreateDto } from './aplication.dto';
import type { Application } from 'prisma/generated/prisma';
import {
  PaginationDto,
  type PaginatedResponse,
} from 'src/shared/pagination.dto';

@Controller('aplication')
export class AplicationController {
  private readonly _service: AplicationService;

  constructor(service: AplicationService) {
    this._service = service;
  }

  @Get()
  async getApplications(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedResponse<Application>> {
    const pagination = new PaginationDto();
    if (page) pagination.page = parseInt(page, 10);
    if (limit) pagination.limit = parseInt(limit, 10);
    if (search) pagination.search = search;

    return this._service.getApplications(pagination);
  }

  @Get(':id')
  async getApplicationById(
    @Param('id') id: string,
  ): Promise<Application | null> {
    return await this._service.getApplicationById(id);
  }

  @Get('user/:userId')
  async getUserApplications(
    @Param('userId') userId: string,
  ): Promise<Application[]> {
    return await this._service.getUserApplications(userId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createApplication(
    @Body() body: AppliactionCreateDto,
  ): Promise<Application | null> {
    return await this._service.createApplication(body);
  }

  @Post('inactive/:id')
  async inactiveApplication(
    @Param('id') id: string,
  ): Promise<Application | null> {
    return await this._service.inactiveApplication(id);
  }

  @Post('suspend/:id')
  async suspendApplication(
    @Param('id') id: string,
  ): Promise<Application | null> {
    return await this._service.suspendApplication(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteApplication(
    @Param('id') id: string,
  ): Promise<Application | null> {
    return await this._service.deleteApplication(id);
  }
}
