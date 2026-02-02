import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { CreateMunicipalityCommand } from './create-municipality.command';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';

export class CreateMunicipalityHandler {
  constructor(private readonly repository: MunicipalityRespository) {}

  async execute(command: CreateMunicipalityCommand): Promise<void> {
    const municipality = Municipality.create({ ...command.municipality_dto });
    await this.repository.create(municipality);
  }
}
