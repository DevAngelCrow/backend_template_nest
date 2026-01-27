import { GetCategoryPermissionsByIdHandler } from '@/modules/security/application/category-permissions/queries/get-category-permissions-by-id/get-category-permissions-by-id.handler';
import { GetCategoryPermissionsByIdQuery } from '@/modules/security/application/category-permissions/queries/get-category-permissions-by-id/get-category-permissions-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCategoryPermissionsByIdQuery)
export class GetCategoryPermissionsByIdQueryAdapter implements IQueryHandler<GetCategoryPermissionsByIdQuery> {
  constructor(private readonly handler: GetCategoryPermissionsByIdHandler) {}
  async execute(query: GetCategoryPermissionsByIdQuery) {
    return this.handler.execute(query);
  }
}
