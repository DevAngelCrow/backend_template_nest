import { Injectable } from '@nestjs/common';
import { Country } from 'src/modules/catalogs/domain/entities/country';
import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
@Injectable()
export class CountryGetAll {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(): Promise<Country[]> {
    const countries = await this.countryRepository.getAll();
    return countries;
  }
}
