import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';
import { ProviderStorageDto } from '../../dtos/provider-storage.dto';
import { ProviderStorage } from 'src/modules/storage/domain/entities/provider-storage';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class ProviderStorageUpdate {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(provider_storage_dto: ProviderStorageDto): Promise<void> {
    const providerStorage = ProviderStorage.create({
      ...provider_storage_dto,
    });
    const providerStorageId = providerStorage.getId();
    if (!providerStorageId) {
      throw new Error(`ProviderStorage id is undefined`);
    }
    const foundProviderStorage =
      await this.providerStorageRepository.getOneById(providerStorageId);
    if (!foundProviderStorage) {
      throw new NotFoundException(
        'ProviderStorage',
        providerStorageId.value().toString(),
      );
    }
    await this.providerStorageRepository.update(providerStorage);
  }
}
