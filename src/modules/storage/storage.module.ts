import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProviderStorageController } from './infrastructure/controllers/provider-storage.controller';

import { StorageFilesController } from './infrastructure/controllers/storage-files.controller';

import { useCaseProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { serviceProviders } from './infrastructure/config/services.config';

@Module({
  imports: [
    RouterModule.register([{ path: 'storage', module: StorageModule }]),
  ],
  controllers: [ProviderStorageController, StorageFilesController],
  providers: [...useCaseProviders, ...repositories, ...serviceProviders],
  exports: [...serviceProviders, ...useCaseProviders],
})
export class StorageModule {}
