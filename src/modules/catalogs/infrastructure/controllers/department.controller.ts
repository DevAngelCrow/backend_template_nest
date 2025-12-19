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

import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { DepartmentHttpDto } from '../dtos/http/department-http-dto/department-http.dto';
import { DepartmentCreate } from '../../application/use-cases/department/department-create';
import { DepartmentUpdate } from '../../application/use-cases/department/department-update';
import { DepartmentGetAll } from '../../application/use-cases/department/department-get-all';
import { DepartmentGetOneById } from '../../application/use-cases/department/department-get-one-by-id';
import { DepartmentDelete } from '../../application/use-cases/department/department-delete';
import { CreateDepartmentDto } from '../dtos/validators/department/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/validators/department/update-department.dto';
import { ApiBearerAuth, ApiProperty, ApiQuery } from '@nestjs/swagger';

type DepartmentGetAllResponse =
  | HttpPaginatedResponseDto<DepartmentHttpDto>
  | DepartmentHttpDto[];
@Controller('departments')
@ApiBearerAuth('JWT-auth')
export class DepartmentController {
  constructor(
    private readonly departmentCreate: DepartmentCreate,
    private readonly departmentUpdate: DepartmentUpdate,
    private readonly departmentGetAll: DepartmentGetAll,
    private readonly departmentGetOneById: DepartmentGetOneById,
    private readonly departmentDelete: DepartmentDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() departmentCreateRequest: CreateDepartmentDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.departmentCreate.run(departmentCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Department created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiProperty({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() departmentUpdateRequest: UpdateDepartmentDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.departmentUpdate.run({ ...departmentUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Department updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'per_page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<DepartmentGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const departmentsPagination = await this.departmentGetAll.run(
        paginationParams,
        filter,
      );
      if (departmentsPagination instanceof Pagination) {
        const departmentsHttpDto = departmentsPagination
          .getEntityList()
          .map((department) => DepartmentHttpDto.fromEntity(department));
        const paginatedDepartmentsResponse =
          new HttpPaginatedResponseDto<DepartmentHttpDto>(
            departmentsHttpDto,
            departmentsPagination.getTotalItems(),
            departmentsPagination.getTotalPages(),
            departmentsPagination.getPage(),
            departmentsPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<DepartmentHttpDto>
        >(
          paginatedDepartmentsResponse,
          HttpStatus.OK,
          'Departments retrieved successfully',
        );
      }
    }

    const departments = await this.departmentGetAll.run(undefined, filter);

    const departmentsHttpDto =
      Array.isArray(departments)
        ? departments.map((department) =>
            DepartmentHttpDto.fromEntity(department),
          )
        : [];
    return new SuccessResponseDto<DepartmentHttpDto[]>(
      departmentsHttpDto,
      HttpStatus.OK,
      'Departments retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  @ApiProperty({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DepartmentHttpDto>> {
    const department = await this.departmentGetOneById.run(id);
    if (!department) {
      throw new NotFoundException('Department', id.toString());
    }
    const departmentDtoHttp = DepartmentHttpDto.fromEntity(department);
    return new SuccessResponseDto<DepartmentHttpDto>(
      departmentDtoHttp,
      HttpStatus.OK,
      'Department retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  @ApiProperty({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.departmentDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Department deleted successfully',
    );
  }
}
