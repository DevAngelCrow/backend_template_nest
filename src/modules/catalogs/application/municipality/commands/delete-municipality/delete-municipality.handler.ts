import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { DeleteMunicipalityCommand } from './delete-municipality.command';
import { MunicipalityId } from '@/modules/catalogs/domain/value-objects/municipality-value-object/municipality-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { MunicipalityQueriesRepository } from '../../../repositories/municipality-read.repository';

export class DeleteMunicipalityHandler {
  constructor(
    private readonly repository: MunicipalityRespository,
    private readonly readRepository: MunicipalityQueriesRepository,
  ) {}
  async execute(command: DeleteMunicipalityCommand): Promise<void> {
    const municipality = await this.readRepository.getOneById(
      new MunicipalityId(command.id),
    );
    if (!municipality) {
      throw new NotFoundException('Municipality', command.id.toString());
    }
    const municipalityId = municipality.getId();
    if (!municipalityId) {
      throw new Error(`Municipality id is undefined`);
    }
    await this.repository.delete(municipalityId);
  }
}
