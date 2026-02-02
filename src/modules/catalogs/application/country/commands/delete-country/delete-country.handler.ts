import { CountryRepository } from '@/modules/catalogs/domain/repositories/country-repository';
import { DeleteCountryCommand } from './delete-country.command';
import { CountryId } from '@/modules/catalogs/domain/value-objects/country-value-object/country-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { CountryQueriesRepository } from '../../../repositories/country-read.repository';

export class DeleteCountryHandler {
  constructor(
    private readonly repository: CountryRepository,
    private readonly readRepository: CountryQueriesRepository,
  ) {}
  async execute(command: DeleteCountryCommand): Promise<void> {
    const country = await this.readRepository.getOneById(
      new CountryId(command.id),
    );
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
