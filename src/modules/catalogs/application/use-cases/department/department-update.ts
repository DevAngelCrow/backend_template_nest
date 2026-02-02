import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { DepartmentDto } from '../../dtos/department.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Department } from '@/modules/catalogs/domain/entities/department';

export class DepartmentUpdate {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(department_dto: DepartmentDto): Promise<void> {
    const department = Department.create({ ...department_dto });
    const departmentId = department.getId();
    if (!departmentId) {
      throw new Error(`Department id is undefined`);
    }
    const foundDepartment =
      await this.departmentRepository.getOneById(departmentId);
    if (!foundDepartment) {
      throw new NotFoundException(
        'Department',
        departmentId.value().toString(),
      );
    }
    await this.departmentRepository.update(department);
  }
}
