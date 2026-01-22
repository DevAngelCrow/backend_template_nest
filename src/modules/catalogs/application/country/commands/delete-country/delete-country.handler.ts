import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { DeleteCountryCommand } from './delete-country.command';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class DeleteCountryHandler {
  constructor(private readonly repository: CountryRepository) {}
  async execute(command: DeleteCountryCommand): Promise<void> {
    const country = await this.repository.getOneById(new CountryId(command.id));
    if (!country) {
      throw new NotFoundException('Country', command.id.toString());
    }
    const countryId = country.getId();
    if (!countryId) {
      throw new Error(`Country id is undefined`);
    }
    await this.repository.delete(countryId);
  }
}
