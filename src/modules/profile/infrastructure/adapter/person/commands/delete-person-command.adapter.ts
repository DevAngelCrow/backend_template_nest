import { DeletePersonCommand } from '@/modules/profile/application/person/commands/delete-person/delete-person.command';
import { DeletePersonHandler } from '@/modules/profile/application/person/commands/delete-person/delete-person.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeletePersonCommand)
export class DeletePersonCommandAdapter implements ICommandHandler<DeletePersonCommand> {
  constructor(private readonly handler: DeletePersonHandler) {}
  async execute(command: DeletePersonCommand) {
    return this.handler.execute(command);
  }
}
