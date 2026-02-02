import { CreateCategoryPermissionsCommand } from '@/modules/security/application/category-permissions/commands/create-category-permissions/create-category-permissions.command';
import { CreateCategoryPermissionsHandler } from '@/modules/security/application/category-permissions/commands/create-category-permissions/create-category-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateCategoryPermissionsCommand)
export class CreateCategoryPermissionsCommandAdapter implements ICommandHandler<CreateCategoryPermissionsCommand> {
  constructor(private readonly handler: CreateCategoryPermissionsHandler) {}
  async execute(command: CreateCategoryPermissionsCommand) {
    return this.handler.execute(command);
  }
}
