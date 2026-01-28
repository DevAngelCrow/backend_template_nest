import { UpdateProviderStorageHandler } from '@/modules/storage/application/provider-storage/commands/update-provider-storage/update-provider-storage.handler';
import { UpdateProviderStorageCommand } from '@/modules/storage/application/provider-storage/commands/update-provider-storage/update-provider-storage.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateProviderStorageCommand)
export class UpdateProviderStorageCommandAdapter implements ICommandHandler<UpdateProviderStorageCommand> {
  constructor(private readonly handler: UpdateProviderStorageHandler) {}

  async execute(command: UpdateProviderStorageCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
