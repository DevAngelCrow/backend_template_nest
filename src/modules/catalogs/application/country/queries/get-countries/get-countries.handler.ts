import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { Country } from '@/modules/catalogs/domain/entities/country';
import { GetCountriesQuery } from './get-countries.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class GetCountriesHandler {
  constructor(private readonly repository: CountryRepository) {}
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
