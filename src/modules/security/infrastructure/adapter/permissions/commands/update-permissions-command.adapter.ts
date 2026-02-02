import { UpdatePermissionsCommand } from '@/modules/security/application/permissions/commands/update-permissions/update-permissions.command';
import { UpdatePermissionsHandler } from '@/modules/security/application/permissions/commands/update-permissions/update-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdatePermissionsCommand)
export class UpdatePermissionsCommandAdapter implements ICommandHandler<UpdatePermissionsCommand> {
  constructor(private readonly handler: UpdatePermissionsHandler) {}
  async execute(command: UpdatePermissionsCommand) {
    return this.handler.execute(command);
  }
}
