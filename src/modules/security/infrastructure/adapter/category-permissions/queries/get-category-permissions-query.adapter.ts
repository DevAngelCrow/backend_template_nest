import { GetCategoryPermissionsHandler } from '@/modules/security/application/category-permissions/queries/get-category-permissions/get-category-permissions.handler';
import { GetCategoryPermissionsQuery } from '@/modules/security/application/category-permissions/queries/get-category-permissions/get-category-permissions.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCategoryPermissionsQuery)
export class GetCategoryPermissionsQueryAdapter implements IQueryHandler<GetCategoryPermissionsQuery> {
  constructor(private readonly handler: GetCategoryPermissionsHandler) {}
  async execute(query: GetCategoryPermissionsQuery) {
    return this.handler.execute(query);
  }
}
