import { UpdateAddressCommand } from '@/modules/profile/application/address/commands/update-address/update-address.command';
import { UpdateAddressHandler } from '@/modules/profile/application/address/commands/update-address/update-address.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateAddressCommand)
export class UpdateAddressCommandAdapter implements ICommandHandler<UpdateAddressCommand> {
  constructor(private readonly handler: UpdateAddressHandler) {}
  async execute(command: UpdateAddressCommand) {
    return this.handler.execute(command);
  }
}
