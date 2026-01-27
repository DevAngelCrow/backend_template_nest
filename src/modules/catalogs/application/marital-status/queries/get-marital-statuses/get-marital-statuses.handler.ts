import { Pagination } from '@/shared/domain/value-object/pagination';
import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';
import { GetMaritalStatusesQuery } from './get-marital-statuses.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { MaritalStatusQueriesRepository } from '../../../repositories/marital-status-read.repository';

export class GetMaritalStatusesHandler {
  constructor(private readonly repository: MaritalStatusQueriesRepository) {}
  async execute(
    query: GetMaritalStatusesQuery,
  ): Promise<Pagination<MaritalStatus> | MaritalStatus[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
