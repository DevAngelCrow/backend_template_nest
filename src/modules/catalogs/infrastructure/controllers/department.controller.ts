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
import { CreateDepartmentDto } from '../dtos/validators/department/create-department.dto';
import { UpdateDepartmentDto } from '../dtos/validators/department/update-department.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDepartmentCommand } from '../../application/department/commands/create-department/create-department.command';
import { UpdateDepartmentCommand } from '../../application/department/commands/update-department/update-department.command';
import { DeleteDepartmentCommand } from '../../application/department/commands/delete-department/delete-department.command';
import { GetDepartmentsQuery } from '../../application/department/queries/get-departments/get-departments.query';
import { GetDepartmentQuery } from '../../application/department/queries/get-department/get-department.query';
import { Department } from '../../domain/entities/department';

type DepartmentGetAllResponse =
  | HttpPaginatedResponseDto<DepartmentHttpDto>
  | DepartmentHttpDto[];
@Controller('departments')
@ApiBearerAuth('JWT-auth')
export class DepartmentController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() departmentCreateRequest: CreateDepartmentDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateDepartmentCommand(departmentCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Department created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() departmentUpdateRequest: UpdateDepartmentDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateDepartmentCommand({
      ...departmentUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
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
      const query = new GetDepartmentsQuery(paginationParams, filter);

      const departmentsPagination = await this.queryBus.execute(query);

      if (departmentsPagination instanceof Pagination) {
        const departmentsHttpDto = departmentsPagination
          .getEntityList()
          .map((department: Department) =>
            DepartmentHttpDto.fromEntity(department),
          );
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
    const query = new GetDepartmentsQuery();
    const departments = await this.queryBus.execute(query);

    const departmentsHttpDto = Array.isArray(departments)
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
  @ApiParam({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DepartmentHttpDto>> {
    const query = new GetDepartmentQuery(id);
    const department = await this.queryBus.execute(query);
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
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteDepartmentCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Department deleted successfully',
    );
  }
}
