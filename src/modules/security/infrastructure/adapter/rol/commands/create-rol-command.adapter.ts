import { CreateRolCommand } from '@/modules/security/application/rol/commands/create-rol/create-rol.command';
import { CreateRolHandler } from '@/modules/security/application/rol/commands/create-rol/create-rol.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateRolCommand)
export class CreateRolCommandAdapter implements ICommandHandler<CreateRolCommand> {
  constructor(private readonly handler: CreateRolHandler) {}
  async execute(command: CreateRolCommand) {
    return this.handler.execute(command);
  }
}
