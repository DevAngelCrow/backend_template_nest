import { Injectable } from '@nestjs/common';
import { Country } from 'src/modules/catalogs/domain/entities/country';
import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
@Injectable()
export class CountryGetAll {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ countries: Country[]; total: number }> {
    return await this.countryRepository.getAll(page, per_page, filter);
  }
}
