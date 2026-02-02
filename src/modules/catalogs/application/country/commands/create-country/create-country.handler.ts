import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { CreateCountryCommand } from './create-country.command';
import { Country } from '@/modules/catalogs/domain/entities/country';

export class CreateCountryHandler {
  constructor(private readonly repository: CountryRepository) {}

  async execute(command: CreateCountryCommand): Promise<void> {
    const country = Country.create({ ...command.country_dto });
    await this.repository.create(country);
  }
}
