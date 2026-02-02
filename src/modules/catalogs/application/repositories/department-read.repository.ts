import { Pagination } from '@/shared/domain/value-object/pagination';
import { Department } from '../../domain/entities/department';
import { DepartmentId } from '../../domain/value-objects/department-value-object/department-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class DepartmentQueriesRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Department> | Department[]>;
  abstract getOneById(id: DepartmentId): Promise<Department | null>;
}
