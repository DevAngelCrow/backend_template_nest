import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissions } from '../../domain/entities/category-permissions';
import { CategoryPermissionsRepository } from '../../domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '../../domain/value-objects/category-permissions-value-object/category-permissions-id';

export class ImplCategoryPermissionsRepository implements CategoryPermissionsRepository {
  create(category_permissions: CategoryPermissions): Promise<void> {
    try {
        
    } catch (error) {
        throw new Error('Method not implemented.');
    }
    
  }
  update(category_permissions: CategoryPermissions): Promise<void> {
    try {
        
    } catch (error) {
        throw new Error('Method not implemented.');
    }
  }
  getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]> {
    try {
        
    } catch (error) {
        throw new Error('Method not implemented.');
    }
  }
  getOneById(id: CategoryPermissionsId): Promise<CategoryPermissions | null> {
    try {
        
    } catch (error) {
        throw new Error('Method not implemented.');
    }
  }
  delete(id: CategoryPermissionsId): Promise<void> {
    try {
        
    } catch (error) {
        throw new Error('Method not implemented.');
    }
  }
}
