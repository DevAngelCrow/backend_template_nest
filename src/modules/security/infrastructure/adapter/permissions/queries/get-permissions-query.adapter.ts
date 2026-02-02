import { GetPermissionsHandler } from '@/modules/security/application/permissions/queries/get-permissions/get-permissions.handler';
import { GetPermissionsQuery } from '@/modules/security/application/permissions/queries/get-permissions/get-permissions.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPermissionsQuery)
export class GetPermissionsQueryAdapter implements IQueryHandler<GetPermissionsQuery> {
  constructor(private readonly handler: GetPermissionsHandler) {}
  async execute(query: GetPermissionsQuery) {
    return this.handler.execute(query);
  }
}
