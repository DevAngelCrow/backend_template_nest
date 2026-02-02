import { UpdateCategoryPermissionsCommand } from '@/modules/security/application/category-permissions/commands/update-category-permissions/update-category-permissions.command';
import { UpdateCategoryPermissionsHandler } from '@/modules/security/application/category-permissions/commands/update-category-permissions/update-category-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateCategoryPermissionsCommand)
export class UpdateCategoryPermissionsCommandAdapter implements ICommandHandler<UpdateCategoryPermissionsCommand> {
  constructor(private readonly handler: UpdateCategoryPermissionsHandler) {}
  async execute(command: UpdateCategoryPermissionsCommand) {
    return this.handler.execute(command);
  }
}
