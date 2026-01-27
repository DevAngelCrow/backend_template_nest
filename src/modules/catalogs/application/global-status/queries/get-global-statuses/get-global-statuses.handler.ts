import { Pagination } from '@/shared/domain/value-object/pagination';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';
import { GetGlobalStatusesQuery } from './get-global-statuses.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { GlobalStatusQueriesRepository } from '../../../repositories/global-status-read.repository';

export class GetGlobalStatusesHandler {
  constructor(private readonly repository: GlobalStatusQueriesRepository) {}
  async execute(
    query: GetGlobalStatusesQuery,
  ): Promise<Pagination<GlobalStatus> | GlobalStatus[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
