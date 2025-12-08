import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { ProviderStorageController } from './infrastructure/controllers/provider-storage.controller';
import { ProviderStorageCreate } from './application/use-cases/provider-storage/provider-storage-create';
import { ProviderStorageUpdate } from './application/use-cases/provider-storage/provider-storage-update';
import { ProviderStorageGetAll } from './application/use-cases/provider-storage/provider-storage-get-all';
import { ProviderStorageGetOneById } from './application/use-cases/provider-storage/provider-storage-get-one-by-id';
import { ProviderStorageDelete } from './application/use-cases/provider-storage/provider-storage-delete';
import { ProviderStorageRepository } from './domain/repositories/provider-storage.repository';
import { ImplProviderStorageRepository } from './infrastructure/implementation/impl-provider-storage.repository';
import { ProviderStorageGetOneByCode } from './application/use-cases/provider-storage/provider-storage-get-one-by-code';
import { StorageFilesUploadFlow } from './application/use-cases/storage-files/storage-files-upload-flow';
import { StorageFilesRepository } from './domain/repositories/storage-files.repository';
import { ImplStorageFilesRepository } from './infrastructure/implementation/impl-storage-files.repository';
import { StorageFilesController } from './infrastructure/controllers/storage-files.controller';
import { StorageUploadService } from './application/services/storage/storage-upload.service';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';

@Module({
  imports: [
    RouterModule.register([{ path: 'storage', module: StorageModule }]),
  ],
  controllers: [ProviderStorageController, StorageFilesController],
  providers: [
    StorageUploadService,
    ProviderStorageCreate,
    ProviderStorageUpdate,
    ProviderStorageGetAll,
    ProviderStorageGetOneById,
    ProviderStorageDelete,
    ProviderStorageGetOneByCode,
    StorageFilesUploadFlow,
    {
      provide: ProviderStorageRepository,
      useClass: ImplProviderStorageRepository,
    },
    {
      provide: StorageFilesRepository,
      useClass: ImplStorageFilesRepository,
    },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [StorageUploadService],
})
export class StorageModule {}
