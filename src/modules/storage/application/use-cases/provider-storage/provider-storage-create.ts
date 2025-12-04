import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';
import { ProviderStorageDto } from '../../dtos/provider-storage.dto';
import { ProviderStorage } from 'src/modules/storage/domain/entities/provider-storage';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProviderStorageCreate {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(provider_storage_dto: ProviderStorageDto): Promise<void> {
    const providerStorage = ProviderStorage.create({
      ...provider_storage_dto,
    });
    await this.providerStorageRepository.create(providerStorage);
  }
}