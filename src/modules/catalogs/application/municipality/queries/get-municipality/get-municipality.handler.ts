import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { GetMunicipalityQuery } from './get-municipality.query';
import { MunicipalityId } from '@/modules/catalogs/domain/value-objects/municipality-value-object/municipality-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { MunicipalityQueriesRepository } from '../../../repositories/municipality-read.repository';

export class GetMunicipalityHandler {
  constructor(private readonly repository: MunicipalityQueriesRepository) {}

  async execute(query: GetMunicipalityQuery): Promise<Municipality | null> {
    const municipalityId = new MunicipalityId(query.id_municipality);
    const municipality = await this.repository.getOneById(municipalityId);
    if (!municipality) {
      throw new NotFoundException(
        'Municipality',
        query.id_municipality.toString(),
      );
    }
    return municipality;
  }
}
