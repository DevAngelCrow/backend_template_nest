import { UpdateRolCommand } from '@/modules/security/application/rol/commands/update-rol/update-rol.command';
import { UpdateRolHandler } from '@/modules/security/application/rol/commands/update-rol/update-rol.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateRolCommand)
export class UpdateRolCommandAdapter implements ICommandHandler<UpdateRolCommand> {
  constructor(private readonly handler: UpdateRolHandler) {}
  async execute(command: UpdateRolCommand) {
    return this.handler.execute(command);
  }
}
