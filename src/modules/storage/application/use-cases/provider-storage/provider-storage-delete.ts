import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';
import { ProviderStorageId } from 'src/modules/storage/domain/value-objects/provider-storage-value-object/provider-storage-id';

@Injectable()
export class ProviderStorageDelete {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(id: number): Promise<void> {
    const providerStorage = await this.providerStorageRepository.getOneById(
      new ProviderStorageId(id),
    );
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', id.toString());
    }
    const providerStorageId = providerStorage.getId();
    if (!providerStorageId) {
      throw new Error(`ProviderStorage id is undefined`);
    }
    await this.providerStorageRepository.delete(providerStorageId);
  }
}