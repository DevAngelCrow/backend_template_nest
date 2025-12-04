import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProviderStorageController } from './infrastructure/controllers/provider-storage.controller';
import { ProviderStorageCreate } from './application/use-cases/provider-storage/provider-storage-create';
import { ProviderStorageUpdate } from './application/use-cases/provider-storage/provider-storage-update';
import { ProviderStorageGetAll } from './application/use-cases/provider-storage/provider-storage-get-all';
import { ProviderStorageGetOneById } from './application/use-cases/provider-storage/provider-storage-get-one-by-id';
import { ProviderStorageDelete } from './application/use-cases/provider-storage/provider-storage-delete';
import { ProviderStorageRepository } from './domain/repositories/provider-storage.repository';
import { ImplProviderStorageRepository } from './infrastructure/implementation/impl-provider-storage.repository';
import { ProviderStorageGetOneByCode } from './application/use-cases/provider-storage/provider-storage-get-one-by-code';

@Module({
  imports: [
    RouterModule.register([{ path: 'storage', module: StorageModule }]),
  ],
  controllers: [ProviderStorageController],
  providers: [
    ProviderStorageCreate,
    ProviderStorageUpdate,
    ProviderStorageGetAll,
    ProviderStorageGetOneById,
    ProviderStorageDelete,
    ProviderStorageGetOneByCode,
    {
      provide: ProviderStorageRepository,
      useClass: ImplProviderStorageRepository,
    },
  ],
  exports: [],
})
export class StorageModule {}
