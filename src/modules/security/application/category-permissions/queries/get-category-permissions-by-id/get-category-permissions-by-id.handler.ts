import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '@/modules/security/domain/value-objects/category-permissions-value-object/category-permissions-id';
import { GetCategoryPermissionsByIdQuery } from './get-category-permissions-by-id.query';

export class GetCategoryPermissionsByIdHandler {
  constructor(private readonly repository: CategoryPermissionsRepository) {}

  async execute(query: GetCategoryPermissionsByIdQuery) {
    return await this.repository.getOneById(
      new CategoryPermissionsId(query.id),
    );
  }
}
