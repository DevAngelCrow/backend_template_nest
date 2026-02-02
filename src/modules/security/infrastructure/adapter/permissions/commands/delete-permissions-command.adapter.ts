import { DeletePermissionsCommand } from '@/modules/security/application/permissions/commands/delete-permissions/delete-permissions.command';
import { DeletePermissionsHandler } from '@/modules/security/application/permissions/commands/delete-permissions/delete-permissions.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeletePermissionsCommand)
export class DeletePermissionsCommandAdapter implements ICommandHandler<DeletePermissionsCommand> {
  constructor(private readonly handler: DeletePermissionsHandler) {}
  async execute(command: DeletePermissionsCommand) {
    return this.handler.execute(command);
  }
}
