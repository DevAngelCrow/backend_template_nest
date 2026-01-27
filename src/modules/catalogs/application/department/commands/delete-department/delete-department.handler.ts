import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { DeleteDepartmentCommand } from './delete-department.command';
import { DepartmentId } from '@/modules/catalogs/domain/value-objects/department-value-object/department-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DepartmentQueriesRepository } from '../../../repositories/department-read.repository';

export class DeleteDepartmentHandler {
  constructor(
    private readonly repository: DepartmentRepository,
    private readonly readRepository: DepartmentQueriesRepository,
  ) {}
  async execute(command: DeleteDepartmentCommand): Promise<void> {
    const department = await this.readRepository.getOneById(
      new DepartmentId(command.id),
    );
    if (!department) {
      throw new NotFoundException('Department', command.id.toString());
    }
    const departmentId = department.getId();
    if (!departmentId) {
      throw new Error(`Department id is undefined`);
    }
    await this.repository.delete(departmentId);
  }
}
