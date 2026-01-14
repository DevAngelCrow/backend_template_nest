import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissions } from '../entities/category-permissions';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { CategoryPermissionsId } from '../value-objects/category-permissions-value-object/category-permissions-id';

export abstract class CategoryPermissionsRepository {
  abstract create(category_permissions: CategoryPermissions): Promise<void>;
  abstract update(category_permissions: CategoryPermissions): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]>;
  abstract getOneById(
    id: CategoryPermissionsId,
  ): Promise<CategoryPermissions | null>;
  abstract delete(id: CategoryPermissionsId): Promise<void>;
}
