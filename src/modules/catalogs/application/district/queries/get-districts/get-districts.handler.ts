import { Pagination } from '@/shared/domain/value-object/pagination';
import { District } from '@/modules/catalogs/domain/entities/district';
import { GetDistrictsQuery } from './get-districts.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { DistrictQueriesRepository } from '../../../repositories/district-read.repository';

export class GetDistrictsHandler {
  constructor(private readonly repository: DistrictQueriesRepository) {}
  async execute(
    query: GetDistrictsQuery,
  ): Promise<Pagination<District> | District[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
