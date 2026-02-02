import { GetRolesHandler } from '@/modules/security/application/rol/queries/get-roles/get-roles.handler';
import { GetRolesQuery } from '@/modules/security/application/rol/queries/get-roles/get-roles.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRolesQuery)
export class GetRolesQueryAdapter implements IQueryHandler<GetRolesQuery> {
  constructor(private readonly handler: GetRolesHandler) {}
  async execute(query: GetRolesQuery) {
    return this.handler.execute(query);
  }
}
