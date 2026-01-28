import { CreateProviderStorageHandler } from '@/modules/storage/application/provider-storage/commands/create-provider-storage/create-provider-storage.handler';
import { CreateProviderStorageCommand } from '@/modules/storage/application/provider-storage/commands/create-provider-storage/create-provider-storage.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateProviderStorageCommand)
export class CreateProviderStorageCommandAdapter implements ICommandHandler<CreateProviderStorageCommand> {
  constructor(private readonly handler: CreateProviderStorageHandler) {}

  async execute(command: CreateProviderStorageCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
