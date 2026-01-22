import { Country } from '@/modules/catalogs/domain/entities/country';
import { GetCountryQuery } from './get-country.query';
import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class GetCountryHandler {
  constructor(private readonly repository: CountryRepository) {}

  async execute(query: GetCountryQuery): Promise<Country | null> {
    const countryId = new CountryId(query.id_country);
    const country = await this.repository.getOneById(countryId);
    if (!country) {
      throw new NotFoundException('Country', query.id_country.toString());
    }
    return country;
  }
}
