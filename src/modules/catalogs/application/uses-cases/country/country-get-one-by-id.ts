import { Injectable } from '@nestjs/common';
import { Country } from '@/modules/catalogs/domain/entities/country';
import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

@Injectable()
export class CountryGetOneByIdUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: number): Promise<Country> {
    const countryId = new CountryId(id);
    const country = await this.countryRepository.getOneById(countryId);

    if (!country) {
      throw new NotFoundException('Country', id.toString());
    }

    return country;
  }
}
