import { Abstract, Type } from '@nestjs/common';
import { GetProviderStoragesHandler } from '../../application/provider-storage/queries/get-provider-storages/get-provider-storages.handler';
import { GetProviderStorageHandler } from '../../application/provider-storage/queries/get-provider-storage/get-provider-storage.handler';
import { GetProviderStorageByCodeHandler } from '../../application/provider-storage/queries/get-provider-storage-by-code/get-provider-storage-by-code.handler';
import { ProviderStorageQueriesRepository } from '../../application/repositories/provider-storage-read.repository';
import { GetAllProviderStorageQueryAdapter } from '../adapter/provider-storage/queries/get-all-query.adapter';
import { GetOneByIdProviderStorageQueryAdapter } from '../adapter/provider-storage/queries/get-one-by-id-query.adapter';
import { GetOneByCodeProviderStorageQueryAdapter } from '../adapter/provider-storage/queries/get-one-by-code-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // ProviderStorage
  {
    handler: GetProviderStoragesHandler,
    deps: [ProviderStorageQueriesRepository],
  },
  {
    handler: GetProviderStorageHandler,
    deps: [ProviderStorageQueriesRepository],
  },
  {
    handler: GetProviderStorageByCodeHandler,
    deps: [ProviderStorageQueriesRepository],
  },
];

export const queryAdapters = [
  GetAllProviderStorageQueryAdapter,
  GetOneByIdProviderStorageQueryAdapter,
  GetOneByCodeProviderStorageQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
