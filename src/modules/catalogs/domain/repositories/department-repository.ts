import { Department } from '../entities/department';
import { DepartmentId } from '../value-objects/department-value-object/department-id';

export abstract class DepartmentRepository {
  abstract create(department: Department): Promise<void>;
  abstract update(department: Department): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<Department[]>;
  abstract getOneById(id: DepartmentId): Promise<Department | null>;
  abstract delete(id: DepartmentId): Promise<void>;
}
