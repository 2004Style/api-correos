import {
  Controller,
  Post,
  Get,
  Delete,
  Put,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto, UserUpdateDto } from './user.dto';
import type { User } from 'prisma/generated/prisma';
import {
  PaginationDto,
  type PaginatedResponse,
} from 'src/shared/pagination.dto';

@Controller('user')
export class UserController {
  private readonly _service: UserService;

  constructor(service: UserService) {
    this._service = service;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: UserCreateDto): Promise<User | null> {
    return await this._service.createUser({
      ...body,
    });
  }

  @Get()
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('search') search?: string,
  ): Promise<PaginatedResponse<User>> {
    const pagination = new PaginationDto();
    if (page) pagination.page = parseInt(page, 10);
    if (limit) pagination.limit = parseInt(limit, 10);
    if (search) pagination.search = search;

    return await this._service.getUsers(pagination);
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this._service.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateDto,
  ): Promise<User | null> {
    return this._service.updateUser(id, {
      ...body,
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<User | null> {
    return this._service.deleteUser(id);
  }
}
