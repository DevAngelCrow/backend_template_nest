import { DeleteAddressCommand } from '@/modules/profile/application/address/commands/delete-address/delete-address.command';
import { DeleteAddressHandler } from '@/modules/profile/application/address/commands/delete-address/delete-address.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteAddressCommand)
export class DeleteAddressCommandAdapter implements ICommandHandler<DeleteAddressCommand> {
  constructor(private readonly handler: DeleteAddressHandler) {}
  async execute(command: DeleteAddressCommand) {
    return this.handler.execute(command);
  }
}
