import { GetCountryHandler } from '@/modules/catalogs/application/country/queries/get-country/get-country.handler';
import { GetCountryQuery } from '@/modules/catalogs/application/country/queries/get-country/get-country.query';
import { Country } from '@/modules/catalogs/domain/entities/country';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetCountryQuery)
export class GetOneByIdCountryQueryAdapter implements IQueryHandler<GetCountryQuery> {
  constructor(private readonly handler: GetCountryHandler) {}
  async execute(query: GetCountryQuery): Promise<Country | null> {
    return this.handler.execute(query);
  }
}
