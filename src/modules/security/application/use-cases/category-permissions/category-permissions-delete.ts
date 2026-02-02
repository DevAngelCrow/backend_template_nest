import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '@/modules/security/domain/value-objects/category-permissions-value-object/category-permissions-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class CategoryPermissionsDelete {
  constructor(protected readonly repository: CategoryPermissionsRepository) {}
  public async run(id: number): Promise<void> {
    const categoryPermissions = await this.repository.getOneById(
      new CategoryPermissionsId(id),
    );
    if (!categoryPermissions) {
      throw new NotFoundException('CategoryPermissions', id.toString());
    }
    const categoryPermissionsId = categoryPermissions.getId();
    if (!categoryPermissionsId) {
      throw new Error(`CategoryPermissions id is undefined`);
    }
    await this.repository.delete(categoryPermissionsId);
  }
}
