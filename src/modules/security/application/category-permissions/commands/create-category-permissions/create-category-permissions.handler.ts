import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { CreateCategoryPermissionsCommand } from './create-category-permissions.command';
import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';

export class CreateCategoryPermissionsHandler {
  constructor(private readonly repository: CategoryPermissionsRepository) {}

  async execute(command: CreateCategoryPermissionsCommand): Promise<void> {
    const categoryPermissions = CategoryPermissions.create({
      ...command.category_permissions_dto,
    });
    await this.repository.create(categoryPermissions);
  }
}
