import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
import { CountryDto } from '../../dtos/country.dto';
import { Country } from 'src/modules/catalogs/domain/entities/country';

export class CountryCreate {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(country_dto: CountryDto): Promise<void> {
    const country = Country.create({ ...country_dto });
    await this.countryRepository.create(country);
  }
}
