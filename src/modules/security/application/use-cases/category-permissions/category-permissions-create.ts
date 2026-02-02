import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CategoryPermissionsDto } from '../../dtos/category-permissions.dto';
import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';

export class CategoryPermissionsCreate {
  constructor(protected readonly repository: CategoryPermissionsRepository) {}
  public async run(
    category_permissions_dto: CategoryPermissionsDto,
  ): Promise<void> {
    const categoryPermissions = CategoryPermissions.create({
      ...category_permissions_dto,
    });
    await this.repository.create(categoryPermissions);
  }
}
