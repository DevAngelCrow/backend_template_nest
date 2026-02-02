import { DeleteProviderStorageHandler } from '@/modules/storage/application/provider-storage/commands/delete-provider-storage/delete-provider-storage.handler';
import { DeleteProviderStorageCommand } from '@/modules/storage/application/provider-storage/commands/delete-provider-storage/delete-provider-storage.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteProviderStorageCommand)
export class DeleteProviderStorageCommandAdapter implements ICommandHandler<DeleteProviderStorageCommand> {
  constructor(private readonly handler: DeleteProviderStorageHandler) {}

  async execute(command: DeleteProviderStorageCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
