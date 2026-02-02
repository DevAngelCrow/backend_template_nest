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
import { CategoryPermissionsRequestDto } from '../dtos/validators/category-permissions/category-permissions.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { CategoryPermissionsHttpDto } from '../dtos/http/category-permissions-http-dto/category-permissions-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { CategoryPermissions } from '../../domain/entities/category-permissions';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateCategoryPermissionsCommand } from '../../application/category-permissions/commands/create-category-permissions/create-category-permissions.command';
import { UpdateCategoryPermissionsCommand } from '../../application/category-permissions/commands/update-category-permissions/update-category-permissions.command';
import { DeleteCategoryPermissionsCommand } from '../../application/category-permissions/commands/delete-category-permissions/delete-category-permissions.command';
import { GetCategoryPermissionsQuery } from '../../application/category-permissions/queries/get-category-permissions/get-category-permissions.query';
import { GetCategoryPermissionsByIdQuery } from '../../application/category-permissions/queries/get-category-permissions-by-id/get-category-permissions-by-id.query';

type CategoryPermissionsGetAllResponse =
  | HttpPaginatedResponseDto<CategoryPermissionsHttpDto>
  | CategoryPermissionsHttpDto[];

@Controller('category-permissions')
@ApiBearerAuth('JWT-auth')
export class CategoryPermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() categoryPermissionsCreateRequest: CategoryPermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateCategoryPermissionsCommand(
      categoryPermissionsCreateRequest,
    );
    await this.commandBus.execute(command);
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
    const command = new UpdateCategoryPermissionsCommand({
      ...categoryPermissionsUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
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
      const query = new GetCategoryPermissionsQuery(paginationParams, filter);
      const categoryPermissionsPagination = await this.queryBus.execute(query);
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

    const query = new GetCategoryPermissionsQuery(undefined, filter);
    const categoryPermissions = await this.queryBus.execute(query);

    const categoryPermissionsHttpDto = Array.isArray(categoryPermissions)
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
    const query = new GetCategoryPermissionsByIdQuery(id);
    const categoryPermissions = await this.queryBus.execute(query);
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
    const command = new DeleteCategoryPermissionsCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Category-permissions deleted successfully',
    );
  }
}
