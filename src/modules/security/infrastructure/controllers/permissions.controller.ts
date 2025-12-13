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
import { PermissionsCreate } from '../../application/use-cases/permissions/permissions-create';
import { PermissionsUpdate } from '../../application/use-cases/permissions/permissions-update';
import { PermissionsGetAll } from '../../application/use-cases/permissions/permissions-get-all';
import { PermissionsGetOneById } from '../../application/use-cases/permissions/permissions-get-one-by-id';
import { PermissionsDelete } from '../../application/use-cases/permissions/permissions-delete';
import { PermissionsRequestDto } from '../dtos/validators/permissions/permissions.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { PermissionsHttpDto } from '../dtos/http/permissions-http-dto/permissions-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Permissions } from '../../domain/entities/permissions';

type PermissionsGetAllResponse = HttpPaginatedResponseDto<PermissionsHttpDto> | PermissionsHttpDto[];

@Controller('permissions')
export class PermissionsController {
  constructor(
    private readonly permissionsCreate: PermissionsCreate,
    private readonly permissionsUpdate: PermissionsUpdate,
    private readonly permissionsGetAll: PermissionsGetAll,
    private readonly permissionsGetOneById: PermissionsGetOneById,
    private readonly permissionsDelete: PermissionsDelete,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() permissionsCreateRequest: PermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.permissionsCreate.run(permissionsCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Permissions created successfully',
    );
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() permissionsUpdateRequest: PermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.permissionsUpdate.run({ ...permissionsUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Permissions updated successfully',
    );
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<PermissionsGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const permissionsPagination = await this.permissionsGetAll.run(
        paginationParams,
        filter,
      );
      if (permissionsPagination instanceof Pagination) {
        const permissionsHttpDto = permissionsPagination
          .getEntityList()
          .map((permissions: Permissions) => PermissionsHttpDto.fromEntity(permissions));
        const paginatedPermissionsResponse =
          new HttpPaginatedResponseDto<PermissionsHttpDto>(
            permissionsHttpDto,
            permissionsPagination.getTotalItems(),
            permissionsPagination.getTotalPages(),
            permissionsPagination.getPage(),
            permissionsPagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<PermissionsHttpDto>>(
          paginatedPermissionsResponse,
          HttpStatus.OK,
          'Permissions retrieved successfully',
        );
      }
    }

    const permissions = await this.permissionsGetAll.run(undefined, filter);

    const permissionsHttpDto =
      permissions instanceof Array
        ? permissions.map((permissions) => PermissionsHttpDto.fromEntity(permissions))
        : [];
    return new SuccessResponseDto<PermissionsHttpDto[]>(
      permissionsHttpDto,
      HttpStatus.OK,
      'Permissions retrieved successfully',
    );
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<PermissionsHttpDto>> {
    const permissions = await this.permissionsGetOneById.run(id);
    if (!permissions) {
      throw new NotFoundException('Permissions', id.toString());
    }
    const permissionsDtoHttp = PermissionsHttpDto.fromEntity(permissions);
    return new SuccessResponseDto<PermissionsHttpDto>(
      permissionsDtoHttp,
      HttpStatus.OK,
      'Permissions retrieved successfully',
    );
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.permissionsDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Permissions deleted successfully',
    );
  }
}
