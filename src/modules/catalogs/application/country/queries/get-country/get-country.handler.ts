import { Country } from '@/modules/catalogs/domain/entities/country';
import { GetCountryQuery } from './get-country.query';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { CountryQueriesRepository } from '../../../repositories/country-read.repository';

export class GetCountryHandler {
  constructor(private readonly repository: CountryQueriesRepository) {}

  async execute(query: GetCountryQuery): Promise<Country | null> {
    const countryId = new CountryId(query.id_country);
    const country = await this.repository.getOneById(countryId);
    if (!country) {
      throw new NotFoundException('Country', query.id_country.toString());
    }
    return country;
  }
}
