import { Department } from '@/modules/catalogs/domain/entities/department';
import { GetDepartmentQuery } from './get-department.query';
import { DepartmentId } from '@/modules/catalogs/domain/value-objects/department-value-object/department-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DepartmentQueriesRepository } from '../../../repositories/department-read.repository';

export class GetDepartmentHandler {
  constructor(private readonly repository: DepartmentQueriesRepository) {}

  async execute(query: GetDepartmentQuery): Promise<Department | null> {
    const departmentId = new DepartmentId(query.id_department);
    const department = await this.repository.getOneById(departmentId);
    if (!department) {
      throw new NotFoundException('Department', query.id_department.toString());
    }
    return department;
  }
}
