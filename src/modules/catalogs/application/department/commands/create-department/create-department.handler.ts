import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { CreateDepartmentCommand } from './create-department.command';
import { Department } from '@/modules/catalogs/domain/entities/department';

export class CreateDepartmentHandler {
  constructor(private readonly repository: DepartmentRepository) {}

  async execute(command: CreateDepartmentCommand): Promise<void> {
    const department = Department.create({ ...command.department_dto });
    await this.repository.create(department);
  }
}
