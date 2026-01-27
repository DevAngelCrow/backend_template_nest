import { DeleteCategoryPermissionsCommand } from '@/modules/security/application/category-permissions/commands/delete-category-permissions/delete-category-permissions.command';
import { DeleteCategoryPermissionsHandler } from '@/modules/security/application/category-permissions/commands/delete-category-permissions/delete-category-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteCategoryPermissionsCommand)
export class DeleteCategoryPermissionsCommandAdapter implements ICommandHandler<DeleteCategoryPermissionsCommand> {
  constructor(private readonly handler: DeleteCategoryPermissionsHandler) {}
  async execute(command: DeleteCategoryPermissionsCommand) {
    return this.handler.execute(command);
  }
}
