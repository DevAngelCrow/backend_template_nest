import { CreatePersonCommand } from '@/modules/profile/application/person/commands/create-person/create-person.command';
import { CreatePersonHandler } from '@/modules/profile/application/person/commands/create-person/create-person.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreatePersonCommand)
export class CreatePersonCommandAdapter implements ICommandHandler<CreatePersonCommand> {
  constructor(private readonly handler: CreatePersonHandler) {}
  async execute(command: CreatePersonCommand) {
    return this.handler.execute(command);
  }
}
