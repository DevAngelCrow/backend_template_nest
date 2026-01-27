import { CreateUserCommand } from '@/modules/identity-access-management/application/user/commands/create-user/create-user.command';
import { CreateUserHandler } from '@/modules/identity-access-management/application/user/commands/create-user/create-user.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandAdapter implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly handler: CreateUserHandler) {}
  async execute(command: CreateUserCommand) {
    return this.handler.execute(command);
  }
}
