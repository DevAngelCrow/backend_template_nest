import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { UpdateMunicipalityCommand } from './update-municipality.command';
import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { MunicipalityQueriesRepository } from '../../../repositories/municipality-read.repository';

export class UpdateMunicipalityHandler {
  constructor(
    private readonly repository: MunicipalityRespository,
    private readonly readRepository: MunicipalityQueriesRepository,
  ) {}
  async execute(command: UpdateMunicipalityCommand): Promise<void> {
    const municipality = Municipality.create({ ...command.municipality_dto });
    const municipalityId = municipality.getId();
    if (!municipalityId) {
      throw new Error(`Municipality id is undefined`);
    }
    const foundMunicipality =
      await this.readRepository.getOneById(municipalityId);
    if (!foundMunicipality) {
      throw new NotFoundException(
        'Municipality',
        municipalityId.value().toString(),
      );
    }
    await this.repository.update(municipality);
  }
}
