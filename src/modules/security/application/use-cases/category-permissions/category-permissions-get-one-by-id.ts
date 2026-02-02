import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';
import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '@/modules/security/domain/value-objects/category-permissions-value-object/category-permissions-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class CategoryPermissionsGetOneById {
  constructor(protected readonly repository: CategoryPermissionsRepository) {}
  async run(id: number): Promise<CategoryPermissions | null> {
    const categoryPermissions = await this.repository.getOneById(
      new CategoryPermissionsId(id),
    );
    if (!categoryPermissions) {
      throw new NotFoundException('CategoryPermissions', id.toString());
    }
    return categoryPermissions;
  }
}
