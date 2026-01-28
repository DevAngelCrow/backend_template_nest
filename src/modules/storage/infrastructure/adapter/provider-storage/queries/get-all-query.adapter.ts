import { GetProviderStoragesHandler } from '@/modules/storage/application/provider-storage/queries/get-provider-storages/get-provider-storages.handler';
import { GetProviderStoragesQuery } from '@/modules/storage/application/provider-storage/queries/get-provider-storages/get-provider-storages.query';
import { ProviderStorage } from '@/modules/storage/domain/entities/provider-storage';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetProviderStoragesQuery)
export class GetAllProviderStorageQueryAdapter implements IQueryHandler<GetProviderStoragesQuery> {
  constructor(private readonly handler: GetProviderStoragesHandler) {}

  async execute(
    query: GetProviderStoragesQuery,
  ): Promise<Pagination<ProviderStorage> | ProviderStorage[]> {
    return this.handler.execute(query);
  }
}
