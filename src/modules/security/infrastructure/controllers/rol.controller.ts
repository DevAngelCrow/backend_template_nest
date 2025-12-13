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
import { RolCreate } from '../../application/use-cases/rol/rol-create';
import { RolUpdate } from '../../application/use-cases/rol/rol-update';
import { RolGetAll } from '../../application/use-cases/rol/rol-get-all';
import { RolGetOneById } from '../../application/use-cases/rol/rol-get-one-by-id';
import { RolDelete } from '../../application/use-cases/rol/rol-delete';
import { RolRequestDto } from '../dtos/validators/rol/rol.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { RolHttpDto } from '../dtos/http/rol-http-dto/rol-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Rol } from '../../domain/entities/rol';

type RolGetAllResponse = HttpPaginatedResponseDto<RolHttpDto> | RolHttpDto[];

@Controller('rols')
export class RolController {
  constructor(
    private readonly rolCreate: RolCreate,
    private readonly rolUpdate: RolUpdate,
    private readonly rolGetAll: RolGetAll,
    private readonly rolGetOneById: RolGetOneById,
    private readonly rolDelete: RolDelete,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() rolCreateRequest: RolRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.rolCreate.run(rolCreateRequest);
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
    await this.rolUpdate.run({ ...rolUpdateRequest, id });
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
      const rolPagination = await this.rolGetAll.run(paginationParams, filter);
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

    const rols = await this.rolGetAll.run(undefined, filter);

    const rolHttpDto =
      rols instanceof Array
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
    const rol = await this.rolGetOneById.run(id);
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
    await this.rolDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Rol deleted successfully',
    );
  }
}
