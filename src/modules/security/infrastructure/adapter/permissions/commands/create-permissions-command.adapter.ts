import { CreatePermissionsCommand } from '@/modules/security/application/permissions/commands/create-permissions/create-permissions.command';
import { CreatePermissionsHandler } from '@/modules/security/application/permissions/commands/create-permissions/create-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreatePermissionsCommand)
export class CreatePermissionsCommandAdapter implements ICommandHandler<CreatePermissionsCommand> {
  constructor(private readonly handler: CreatePermissionsHandler) {}
  async execute(command: CreatePermissionsCommand) {
    return this.handler.execute(command);
  }
}
