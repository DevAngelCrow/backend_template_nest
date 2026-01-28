import { GetProviderStorageByCodeHandler } from '@/modules/storage/application/provider-storage/queries/get-provider-storage-by-code/get-provider-storage-by-code.handler';
import { GetProviderStorageByCodeQuery } from '@/modules/storage/application/provider-storage/queries/get-provider-storage-by-code/get-provider-storage-by-code.query';
import { ProviderStorage } from '@/modules/storage/domain/entities/provider-storage';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetProviderStorageByCodeQuery)
export class GetOneByCodeProviderStorageQueryAdapter implements IQueryHandler<GetProviderStorageByCodeQuery> {
  constructor(private readonly handler: GetProviderStorageByCodeHandler) {}

  async execute(
    query: GetProviderStorageByCodeQuery,
  ): Promise<ProviderStorage> {
    return this.handler.execute(query);
  }
}
