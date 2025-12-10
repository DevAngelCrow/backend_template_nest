import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { DepartmentId } from '@/modules/catalogs/domain/value-objects/department-value-object/department-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class DepartmentDelete {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(id: number): Promise<void> {
    const department = await this.departmentRepository.getOneById(
      new DepartmentId(id),
    );
    if (!department) {
      throw new NotFoundException('Department', id.toString());
    }
    const departmentId = department.getId();
    if (!departmentId) {
      throw new Error(`Department id is undefined`);
    }
    await this.departmentRepository.delete(departmentId);
  }
}
