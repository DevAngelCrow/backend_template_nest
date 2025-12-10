import { ProviderStorage } from 'src/modules/storage/domain/entities/provider-storage';
import { ProviderStorageRepository } from 'src/modules/storage/domain/repositories/provider-storage.repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class ProviderStorageGetAll {
  constructor(
    protected readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<ProviderStorage> | ProviderStorage[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.providerStorageRepository.getAll(
        paginationParams,
        filter,
      );
    }
    return await this.providerStorageRepository.getAll(undefined, filter);
  }
}
