import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ProviderStorageController } from './infrastructure/controllers/provider-storage.controller';

import { StorageFilesController } from './infrastructure/controllers/storage-files.controller';

import { useCaseProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { serviceProviders } from './infrastructure/config/services.config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  commandAdapters,
  commandHandlerProviders,
} from './infrastructure/config/commands-handlers.config';
import {
  queryAdapters,
  queryHandlerProviders,
} from './infrastructure/config/queries-handlers.config';

@Module({
  imports: [
    RouterModule.register([{ path: 'storage', module: StorageModule }]),
    CqrsModule,
  ],
  controllers: [ProviderStorageController, StorageFilesController],
  providers: [
    ...useCaseProviders,
    ...repositories,
    ...serviceProviders,
    ...commandHandlerProviders,
    ...commandAdapters,
    ...queryHandlerProviders,
    ...queryAdapters,
  ],
  exports: [
    ...serviceProviders,
    ...useCaseProviders,
    ...commandHandlerProviders,
    ...queryHandlerProviders,
  ],
})
export class StorageModule {}
