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
import { DepartmentHttpDto } from '../dtos/http/department-http-dto/department-http.dto';
import { DepartmentCreate } from '../../application/use-cases/department/department-create';
import { DepartmentUpdate } from '../../application/use-cases/department/department-update';
import { DepartmentGetAll } from '../../application/use-cases/department/department-get-all';
import { DepartmentGetOneById } from '../../application/use-cases/department/department-get-one-by-id';
import { DepartmentDelete } from '../../application/use-cases/department/department-delete';
import { CreateDepartmentDto } from '../dtos/validators/department/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/validators/department/update-department.dto';

type DepartmentGetAllResponse =
  | HttpPaginatedResponseDto<DepartmentHttpDto>
  | DepartmentHttpDto[];
@Controller('departments')
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
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<DepartmentGetAllResponse>> {
    const { departments, total } = await this.departmentGetAll.run(
      page,
      per_page,
      filter,
    );
    const departmentDtoHttp = departments.map((department) =>
      DepartmentHttpDto.fromEntity(department),
    );
    if (page !== undefined && per_page !== undefined) {
      const total_page = Math.ceil(total / per_page);

      const paginatedResponse = new HttpPaginatedResponseDto(
        departmentDtoHttp,
        total,
        total_page,
        page,
        per_page,
      );

      return new SuccessResponseDto(
        paginatedResponse,
        HttpStatus.OK,
        'Departments retrieved successfully',
      );
    }
    return new SuccessResponseDto(
      departmentDtoHttp,
      HttpStatus.OK,
      'Departments retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
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
