import { Country } from '@/modules/catalogs/domain/entities/country';
import { UpdateCountryCommand } from './update-country.command';
import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { CountryQueriesRepository } from '../../../repositories/country-read.repository';

export class UpdateCountryHandler {
  constructor(
    private readonly repository: CountryRepository,
    private readonly readRepository: CountryQueriesRepository,
  ) {}
  async execute(command: UpdateCountryCommand): Promise<void> {
    const country = Country.create({ ...command.country_dto });
    const countryId = country.getId();
    if (!countryId) {
      throw new Error(`Country id is undefined`);
    }
    const foundCountry = await this.readRepository.getOneById(countryId);
    if (!foundCountry) {
      throw new NotFoundException('Country', countryId.value().toString());
    }
    await this.repository.update(country);
  }
}
