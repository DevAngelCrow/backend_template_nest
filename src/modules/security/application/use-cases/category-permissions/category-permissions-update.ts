import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CategoryPermissionsDto } from '../../dtos/category-permissions.dto';
import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class CategoryPermissionsUpdate {
  constructor(protected readonly repository: CategoryPermissionsRepository) {}
  async run(category_permissions_dto: CategoryPermissionsDto): Promise<void> {
    const categoryPermissions = CategoryPermissions.create({
      ...category_permissions_dto,
    });
    const categoryPermissionsId = categoryPermissions.getId();
    if (!categoryPermissionsId) {
      throw new Error('CategoryPermissions ID is required for update.');
    }
    const findCateogryPermissions = await this.repository.getOneById(
      categoryPermissionsId,
    );
    if (!findCateogryPermissions) {
      throw new NotFoundException(
        'CategoryPermissions',
        categoryPermissionsId.value().toString(),
      );
    }
    await this.repository.update(categoryPermissions);
  }
}
