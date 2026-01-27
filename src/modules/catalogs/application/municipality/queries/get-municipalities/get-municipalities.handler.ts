import { Pagination } from '@/shared/domain/value-object/pagination';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { GetMunicipalitiesQuery } from './get-municipalities.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { MunicipalityQueriesRepository } from '../../../repositories/municipality-read.repository';

export class GetMunicipalitiesHandler {
  constructor(private readonly repository: MunicipalityQueriesRepository) {}
  async execute(
    query: GetMunicipalitiesQuery,
  ): Promise<Pagination<Municipality> | Municipality[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
