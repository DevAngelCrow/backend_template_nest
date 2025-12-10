import { GlobalStatus } from 'src/modules/catalogs/domain/entities/global-status';
import { GlobalStatsusRepository } from 'src/modules/catalogs/domain/repositories/global-status-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class GlobalStatusGetAll {
  constructor(
    protected readonly globalStatusRepository: GlobalStatsusRepository,
  ) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<GlobalStatus> | GlobalStatus[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.globalStatusRepository.getAll(paginationParams, filter);
    }
    return await this.globalStatusRepository.getAll(undefined, filter);
  }
}
