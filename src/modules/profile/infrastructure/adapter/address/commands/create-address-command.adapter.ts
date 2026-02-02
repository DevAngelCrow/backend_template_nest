import { CreateAddressCommand } from '@/modules/profile/application/address/commands/create-address/create-address.command';
import { CreateAddressHandler } from '@/modules/profile/application/address/commands/create-address/create-address.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateAddressCommand)
export class CreateAddressCommandAdapter implements ICommandHandler<CreateAddressCommand> {
  constructor(private readonly handler: CreateAddressHandler) {}
  async execute(command: CreateAddressCommand) {
    return this.handler.execute(command);
  }
}
