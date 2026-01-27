import { Pagination } from '@/shared/domain/value-object/pagination';
import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';
import { GetCategoryPermissionsQuery } from './get-category-permissions.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';

export class GetCategoryPermissionsHandler {
  constructor(private readonly repository: CategoryPermissionsRepository) {}
  async execute(
    query: GetCategoryPermissionsQuery,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
