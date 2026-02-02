import { DeleteRolCommand } from '@/modules/security/application/rol/commands/delete-rol/delete-rol.command';
import { DeleteRolHandler } from '@/modules/security/application/rol/commands/delete-rol/delete-rol.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteRolCommand)
export class DeleteRolCommandAdapter implements ICommandHandler<DeleteRolCommand> {
  constructor(private readonly handler: DeleteRolHandler) {}
  async execute(command: DeleteRolCommand) {
    return this.handler.execute(command);
  }
}
