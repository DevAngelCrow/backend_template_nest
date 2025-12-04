import { ProviderStorageCode } from '@/modules/storage/domain/value-objects/provider-storage-value-object/provider-storage-code';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { ProviderStorage } from 'src/modules/storage/domain/entities/provider-storage';
import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';

@Injectable()
export class ProviderStorageGetOneByCode {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(code: string): Promise<ProviderStorage | null> {
    const providerStorageCode = new ProviderStorageCode(code);
    const providerStorage =
      await this.providerStorageRepository.getOneByCode(providerStorageCode);
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', code.toString());
    }
    return providerStorage;
  }
}
