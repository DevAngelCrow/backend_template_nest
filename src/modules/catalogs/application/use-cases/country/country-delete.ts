import { Injectable } from '@nestjs/common';
import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
import { CountryId } from 'src/modules/catalogs/domain/value-objects/country-value-object/country-id';

@Injectable()
export class CountryDelete {
  constructor(protected readonly countryRepository: CountryRepository) {}
  public async run(id: number): Promise<void> {
    const country = await this.countryRepository.getOneById(new CountryId(id));
    if (!country) {
      throw new Error(`Country with id ${id} not found`);
    }
    const countryId = country.getId();
    if (!countryId) {
      throw new Error(`Country id is undefined`);
    }
    await this.countryRepository.delete(countryId);
  }
}
