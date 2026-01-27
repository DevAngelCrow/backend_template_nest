import { UpdatePersonCommand } from '@/modules/profile/application/person/commands/update-person/update-person.command';
import { UpdatePersonHandler } from '@/modules/profile/application/person/commands/update-person/update-person.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdatePersonCommand)
export class UpdatePersonCommandAdapter implements ICommandHandler<UpdatePersonCommand> {
  constructor(private readonly handler: UpdatePersonHandler) {}
  async execute(command: UpdatePersonCommand) {
    return this.handler.execute(command);
  }
}
