import { Country } from 'src/modules/catalogs/domain/entities/country';
import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
import { CountryId } from 'src/modules/catalogs/domain/value-objects/country-value-object/country-id';

export class CountryGetOneById {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(id: number): Promise<Country | null> {
    const countryId = new CountryId(id);
    const country = await this.countryRepository.getOneById(countryId);
    return country;
  }
}
