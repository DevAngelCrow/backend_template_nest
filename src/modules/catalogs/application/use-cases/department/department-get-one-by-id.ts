import { Department } from 'src/modules/catalogs/domain/entities/department';
import { DepartmentRepository } from 'src/modules/catalogs/domain/repositories/department-repository';
import { DepartmentId } from 'src/modules/catalogs/domain/value-objects/department-value-object/department-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class DepartmentGetOneById {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(id: number): Promise<Department | null> {
    const departmentId = new DepartmentId(id);
    const department = await this.departmentRepository.getOneById(departmentId);
    if (!department) {
      throw new NotFoundException('Department', id.toString());
    }
    return department;
  }
}
