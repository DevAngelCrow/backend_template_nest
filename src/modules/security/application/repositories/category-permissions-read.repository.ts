import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissions } from '../../domain/entities/category-permissions';
import { CategoryPermissionsId } from '../../domain/value-objects/category-permissions-value-object/category-permissions-id';

export abstract class CategoryPermissionsReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]>;
  abstract getOneById(
    id: CategoryPermissionsId,
  ): Promise<CategoryPermissions | null>;
}
