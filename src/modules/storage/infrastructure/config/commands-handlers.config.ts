import { Abstract, Type } from '@nestjs/common';
import { ProviderStorageRepository } from '../../domain/repositories/provider-storage.repository';
import { CreateProviderStorageHandler } from '../../application/provider-storage/commands/create-provider-storage/create-provider-storage.handler';
import { UpdateProviderStorageHandler } from '../../application/provider-storage/commands/update-provider-storage/update-provider-storage.handler';
import { DeleteProviderStorageHandler } from '../../application/provider-storage/commands/delete-provider-storage/delete-provider-storage.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreateProviderStorageCommandAdapter } from '../adapter/provider-storage/commands/create-provider-storage-command.adapter';
import { UpdateProviderStorageCommandAdapter } from '../adapter/provider-storage/commands/update-provider-storage-command.adapter';
import { DeleteProviderStorageCommandAdapter } from '../adapter/provider-storage/commands/delete-provider-storage-command.adapter';
import { ProviderStorageQueriesRepository } from '../../application/repositories/provider-storage-read.repository';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // ProviderStorage
  {
    handler: CreateProviderStorageHandler,
    deps: [ProviderStorageRepository],
  },
  {
    handler: UpdateProviderStorageHandler,
    deps: [ProviderStorageRepository, ProviderStorageQueriesRepository],
  },
  {
    handler: DeleteProviderStorageHandler,
    deps: [ProviderStorageRepository, ProviderStorageQueriesRepository],
  },
];

export const commandAdapters = [
  CreateProviderStorageCommandAdapter,
  UpdateProviderStorageCommandAdapter,
  DeleteProviderStorageCommandAdapter,
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
