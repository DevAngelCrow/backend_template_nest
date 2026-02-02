import { Pagination } from '@/shared/domain/value-object/pagination';
import { Department } from '../entities/department';
import { DepartmentId } from '../value-objects/department-value-object/department-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class DepartmentRepository {
  abstract create(department: Department): Promise<void>;
  abstract update(department: Department): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Department> | Department[]>;
  abstract getOneById(id: DepartmentId): Promise<Department | null>;
  abstract delete(id: DepartmentId): Promise<void>;
}
