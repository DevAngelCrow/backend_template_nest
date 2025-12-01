import { Injectable } from '@nestjs/common';
import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

@Injectable()
export class CountryDeleteUseCase {
  constructor(private readonly countryRepository: CountryRepository) {}

  async execute(id: number): Promise<void> {
    const countryId = new CountryId(id);
    const country = await this.countryRepository.getOneById(countryId);

    if (!country) {
      throw new NotFoundException('Country', id.toString());
    }

    await this.countryRepository.delete(countryId);
  }
}
