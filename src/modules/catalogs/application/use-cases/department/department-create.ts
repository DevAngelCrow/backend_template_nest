import { DepartmentRepository } from '@/modules/catalogs/domain/repositories/department-repository';
import { Injectable } from '@nestjs/common';
import { DepartmentDto } from '../../dtos/department.dto';
import { Department } from '@/modules/catalogs/domain/entities/department';

@Injectable()
export class DepartmentCreate {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(department_dto: DepartmentDto): Promise<void> {
    const department = Department.create({ ...department_dto });
    await this.departmentRepository.create(department);
  }
}
