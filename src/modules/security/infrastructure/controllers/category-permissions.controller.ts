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
import { CategoryPermissionsCreate } from '../../application/use-cases/category-permissions/category-permissions-create';
import { CategoryPermissionsUpdate } from '../../application/use-cases/category-permissions/category-permissions-update';
import { CategoryPermissionsGetAll } from '../../application/use-cases/category-permissions/category-permissions-get-all';
import { CategoryPermissionsGetOneById } from '../../application/use-cases/category-permissions/category-permissions-get-one-by-id';
import { CategoryPermissionsDelete } from '../../application/use-cases/category-permissions/category-permissions-delete';
import { CategoryPermissionsRequestDto } from '../dtos/validators/category-permissions/category-permissions.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { CategoryPermissionsHttpDto } from '../dtos/http/category-permissions-http-dto/category-permissions-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { CategoryPermissions } from '../../domain/entities/category-permissions';

type CategoryPermissionsGetAllResponse =
  | HttpPaginatedResponseDto<CategoryPermissionsHttpDto>
  | CategoryPermissionsHttpDto[];

@Controller('category-permissions')
export class CategoryPermissionsController {
  constructor(
    private readonly categoryPermissionsCreate: CategoryPermissionsCreate,
    private readonly categoryPermissionsUpdate: CategoryPermissionsUpdate,
    private readonly categoryPermissionsGetAll: CategoryPermissionsGetAll,
    private readonly categoryPermissionsGetOneById: CategoryPermissionsGetOneById,
    private readonly categoryPermissionsDelete: CategoryPermissionsDelete,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() categoryPermissionsCreateRequest: CategoryPermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.categoryPermissionsCreate.run(categoryPermissionsCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Category-permissions created successfully',
    );
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() categoryPermissionsUpdateRequest: CategoryPermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.categoryPermissionsUpdate.run({
      ...categoryPermissionsUpdateRequest,
      id,
    });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Category-permissions updated successfully',
    );
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<CategoryPermissionsGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const categoryPermissionsPagination =
        await this.categoryPermissionsGetAll.run(paginationParams, filter);
      if (categoryPermissionsPagination instanceof Pagination) {
        const categoryPermissionsHttpDto = categoryPermissionsPagination
          .getEntityList()
          .map((categoryPermissions: CategoryPermissions) =>
            CategoryPermissionsHttpDto.fromEntity(categoryPermissions),
          );
        const paginatedCategoryPermissionsResponse =
          new HttpPaginatedResponseDto<CategoryPermissionsHttpDto>(
            categoryPermissionsHttpDto,
            categoryPermissionsPagination.getTotalItems(),
            categoryPermissionsPagination.getTotalPages(),
            categoryPermissionsPagination.getPage(),
            categoryPermissionsPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<CategoryPermissionsHttpDto>
        >(
          paginatedCategoryPermissionsResponse,
          HttpStatus.OK,
          'Category-permissions retrieved successfully',
        );
      }
    }

    const categoryPermissions = await this.categoryPermissionsGetAll.run(
      undefined,
      filter,
    );

    const categoryPermissionsHttpDto =
      categoryPermissions instanceof Array
        ? categoryPermissions.map((categoryPermissions) =>
            CategoryPermissionsHttpDto.fromEntity(categoryPermissions),
          )
        : [];
    return new SuccessResponseDto<CategoryPermissionsHttpDto[]>(
      categoryPermissionsHttpDto,
      HttpStatus.OK,
      'Category-permissions retrieved successfully',
    );
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<CategoryPermissionsHttpDto>> {
    const categoryPermissions =
      await this.categoryPermissionsGetOneById.run(id);
    if (!categoryPermissions) {
      throw new NotFoundException('Category-permissions', id.toString());
    }
    const categoryPermissionsDtoHttp =
      CategoryPermissionsHttpDto.fromEntity(categoryPermissions);
    return new SuccessResponseDto<CategoryPermissionsHttpDto>(
      categoryPermissionsDtoHttp,
      HttpStatus.OK,
      'Category-permissions retrieved successfully',
    );
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.categoryPermissionsDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Category-permissions deleted successfully',
    );
  }
}
