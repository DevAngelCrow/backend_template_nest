import { Pagination } from '@/shared/domain/value-object/pagination';
import { Country } from '@/modules/catalogs/domain/entities/country';
import { GetCountriesQuery } from './get-countries.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CountryQueriesRepository } from '../../../repositories/country-read.repository';

export class GetCountriesHandler {
  constructor(private readonly repository: CountryQueriesRepository) {}
  async execute(
    query: GetCountriesQuery,
  ): Promise<Pagination<Country> | Country[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
