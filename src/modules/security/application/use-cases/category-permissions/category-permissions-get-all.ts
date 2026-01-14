import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';
import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class CategoryPermissionsGetAll {
  constructor(protected readonly repository: CategoryPermissionsRepository) {}
  async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.repository.getAll(paginationParams, filter);
    }
    return await this.repository.getAll(undefined, filter);
  }
}
