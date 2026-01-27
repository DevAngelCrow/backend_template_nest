import { CategoryPermissionsRepository } from '@/modules/security/domain/repositories/category-permissions-repository';
import { DeleteCategoryPermissionsCommand } from './delete-category-permissions.command';
import { CategoryPermissionsId } from '@/modules/security/domain/value-objects/category-permissions-value-object/category-permissions-id';

export class DeleteCategoryPermissionsHandler {
  constructor(private readonly repository: CategoryPermissionsRepository) {}

  async execute(command: DeleteCategoryPermissionsCommand): Promise<void> {
    await this.repository.delete(new CategoryPermissionsId(command.id));
  }
}
