import { Department } from '@/modules/catalogs/domain/entities/department';
import { UpdateDepartmentCommand } from './update-department.command';
import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DepartmentQueriesRepository } from '../../../repositories/department-read.repository';

export class UpdateDepartmentHandler {
  constructor(
    private readonly repository: DepartmentRepository,
    private readonly readRepository: DepartmentQueriesRepository,
  ) {}
  async execute(command: UpdateDepartmentCommand): Promise<void> {
    const department = Department.create({ ...command.department_dto });
    const departmentId = department.getId();
    if (!departmentId) {
      throw new Error(`Department id is undefined`);
    }
    const foundDepartment = await this.readRepository.getOneById(departmentId);
    if (!foundDepartment) {
      throw new NotFoundException(
        'Department',
        departmentId.value().toString(),
      );
    }
    await this.repository.update(department);
  }
}
