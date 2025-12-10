import { Department } from 'src/modules/catalogs/domain/entities/department';
import { DepartmentRepository } from 'src/modules/catalogs/domain/repositories/department-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
export class DepartmentGetAll {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Department> | Department[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.departmentRepository.getAll(paginationParams, filter);
    }
    return await this.departmentRepository.getAll(undefined, filter);
  }
}
