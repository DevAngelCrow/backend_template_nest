import { GetPermissionsByIdHandler } from '@/modules/security/application/permissions/queries/get-permissions-by-id/get-permissions-by-id.handler';
import { GetPermissionsByIdQuery } from '@/modules/security/application/permissions/queries/get-permissions-by-id/get-permissions-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPermissionsByIdQuery)
export class GetPermissionsByIdQueryAdapter implements IQueryHandler<GetPermissionsByIdQuery> {
  constructor(private readonly handler: GetPermissionsByIdHandler) {}
  async execute(query: GetPermissionsByIdQuery) {
    return this.handler.execute(query);
  }
}
