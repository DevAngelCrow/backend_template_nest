import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { ProviderStorage } from 'src/modules/storage/domain/entities/provider-storage';
import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';
import { ProviderStorageId } from 'src/modules/storage/domain/value-objects/provider-storage-value-object/provider-storage-id';

@Injectable()
export class ProviderStorageGetOneById {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(id: number): Promise<ProviderStorage | null> {
    const providerStorageId = new ProviderStorageId(id);
    const providerStorage =
      await this.providerStorageRepository.getOneById(providerStorageId);
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', id.toString());
    }
    return providerStorage;
  }
}
