import { ProviderStorageRepository } from '@/modules/storage/domain/repositories/provider-storage.repository';
import { CreateProviderStorageCommand } from './create-provider-storage.command';
import { ProviderStorage } from '@/modules/storage/domain/entities/provider-storage';

export class CreateProviderStorageHandler {
  constructor(private readonly repository: ProviderStorageRepository) {}

  async execute(command: CreateProviderStorageCommand): Promise<void> {
    const providerStorage = ProviderStorage.create({
      ...command.provider_storage_dto,
    });
    await this.repository.create(providerStorage);
  }
}
