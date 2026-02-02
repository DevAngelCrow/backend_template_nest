import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RolRequestDto } from '../dtos/validators/rol/rol.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { RolHttpDto } from '../dtos/http/rol-http-dto/rol-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Rol } from '../../domain/entities/rol';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRolCommand } from '../../application/rol/commands/create-rol/create-rol.command';
import { UpdateRolCommand } from '../../application/rol/commands/update-rol/update-rol.command';
import { DeleteRolCommand } from '../../application/rol/commands/delete-rol/delete-rol.command';
import { GetRolesQuery } from '../../application/rol/queries/get-roles/get-roles.query';
import { GetRolByIdQuery } from '../../application/rol/queries/get-rol-by-id/get-rol-by-id.query';

type RolGetAllResponse = HttpPaginatedResponseDto<RolHttpDto> | RolHttpDto[];

@Controller('rols')
@ApiBearerAuth('JWT-auth')
export class RolController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() rolCreateRequest: RolRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateRolCommand(rolCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Rol created successfully',
    );
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() rolUpdateRequest: RolRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateRolCommand({ ...rolUpdateRequest, id });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Rol updated successfully',
    );
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<RolGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetRolesQuery(paginationParams, filter);
      const rolPagination = await this.queryBus.execute(query);
      if (rolPagination instanceof Pagination) {
        const rolHttpDto = rolPagination
          .getEntityList()
          .map((rol: Rol) => RolHttpDto.fromEntity(rol));
        const paginatedRolResponse = new HttpPaginatedResponseDto<RolHttpDto>(
          rolHttpDto,
          rolPagination.getTotalItems(),
          rolPagination.getTotalPages(),
          rolPagination.getPage(),
          rolPagination.getPerPage(),
        );
        return new SuccessResponseDto<HttpPaginatedResponseDto<RolHttpDto>>(
          paginatedRolResponse,
          HttpStatus.OK,
          'Rols retrieved successfully',
        );
      }
    }

    const query = new GetRolesQuery(undefined, filter);
    const rols = await this.queryBus.execute(query);

    const rolHttpDto = Array.isArray(rols)
      ? rols.map((rol) => RolHttpDto.fromEntity(rol))
      : [];
    return new SuccessResponseDto<RolHttpDto[]>(
      rolHttpDto,
      HttpStatus.OK,
      'Rols retrieved successfully',
    );
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<RolHttpDto>> {
    const query = new GetRolByIdQuery(id);
    const rol = await this.queryBus.execute(query);
    if (!rol) {
      throw new NotFoundException('Rol', id.toString());
    }
    const rolDtoHttp = RolHttpDto.fromEntity(rol);
    return new SuccessResponseDto<RolHttpDto>(
      rolDtoHttp,
      HttpStatus.OK,
      'Rol retrieved successfully',
    );
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteRolCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Rol deleted successfully',
    );
  }
}
