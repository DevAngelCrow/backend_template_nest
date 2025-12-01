import { Department } from 'src/modules/catalogs/domain/entities/department';
import { DepartmentRepository } from 'src/modules/catalogs/domain/repositories/department-repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class DepartmentGetAll {
  constructor(protected readonly departmentRepository: DepartmentRepository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ departments: Department[]; total: number }> {
    return await this.departmentRepository.getAll(page, per_page, filter);
  }
}
