import { Pagination } from '@/shared/domain/value-object/pagination';
import { Department } from '@/modules/catalogs/domain/entities/department';
import { GetDepartmentsQuery } from './get-departments.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { DepartmentQueriesRepository } from '../../../repositories/department-read.repository';

export class GetDepartmentsHandler {
  constructor(private readonly repository: DepartmentQueriesRepository) {}
  async execute(
    query: GetDepartmentsQuery,
  ): Promise<Pagination<Department> | Department[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
