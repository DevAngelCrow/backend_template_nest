import { GetDepartmentsHandler } from '@/modules/catalogs/application/department/queries/get-departments/get-departments.handler';
import { GetDepartmentsQuery } from '@/modules/catalogs/application/department/queries/get-departments/get-departments.query';
import { Department } from '@/modules/catalogs/domain/entities/department';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDepartmentsQuery)
export class GetAllDepartmentQueryAdapter implements IQueryHandler<GetDepartmentsQuery> {
  constructor(private readonly handler: GetDepartmentsHandler) {}
  async execute(
    query: GetDepartmentsQuery,
  ): Promise<Pagination<Department> | Department[]> {
    return this.handler.execute(query);
  }
}
