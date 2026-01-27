import { GetCountriesHandler } from '@/modules/catalogs/application/country/queries/get-countries/get-countries.handler';
import { GetCountriesQuery } from '@/modules/catalogs/application/country/queries/get-countries/get-countries.query';
import { Country } from '@/modules/catalogs/domain/entities/country';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCountriesQuery)
export class GetAllCountryQueryAdapter implements IQueryHandler<GetCountriesQuery> {
  constructor(private readonly handler: GetCountriesHandler) {}
  async execute(
    query: GetCountriesQuery,
  ): Promise<Pagination<Country> | Country[]> {
    return this.handler.execute(query);
  }
}
