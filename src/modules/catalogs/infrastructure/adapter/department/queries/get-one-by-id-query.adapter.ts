import { GetDepartmentHandler } from '@/modules/catalogs/application/department/queries/get-department/get-department.handler';
import { GetDepartmentQuery } from '@/modules/catalogs/application/department/queries/get-department/get-department.query';
import { Department } from '@/modules/catalogs/domain/entities/department';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDepartmentQuery)
export class GetOneByIdDepartmentQueryAdapter implements IQueryHandler<GetDepartmentQuery> {
  constructor(private readonly handler: GetDepartmentHandler) {}
  async execute(query: GetDepartmentQuery): Promise<Department | null> {
    return this.handler.execute(query);
  }
}
