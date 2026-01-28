import { GetProviderStorageHandler } from '@/modules/storage/application/provider-storage/queries/get-provider-storage/get-provider-storage.handler';
import { GetProviderStorageQuery } from '@/modules/storage/application/provider-storage/queries/get-provider-storage/get-provider-storage.query';
import { ProviderStorage } from '@/modules/storage/domain/entities/provider-storage';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetProviderStorageQuery)
export class GetOneByIdProviderStorageQueryAdapter implements IQueryHandler<GetProviderStorageQuery> {
  constructor(private readonly handler: GetProviderStorageHandler) {}

  async execute(query: GetProviderStorageQuery): Promise<ProviderStorage> {
    return this.handler.execute(query);
  }
}
