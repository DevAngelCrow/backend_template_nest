import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { MunicipalityId } from '@/modules/catalogs/domain/value-objects/municipality-value-object/municipality-id';
import { NotFoundException } from 'src/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MunicipalityDelete {
  constructor(
    protected readonly municipalityRepository: MunicipalityRespository,
  ) {}
  public async run(id: number): Promise<void> {
    const municipality = await this.municipalityRepository.getOneById(
      new MunicipalityId(id),
    );
    if (!municipality) {
      throw new NotFoundException('Municipality', id.toString());
    }
    const municipalityId = municipality.getId();
    if (!municipalityId) {
      throw new Error(`Municipality id is undefined`);
    }
    await this.municipalityRepository.delete(municipalityId);
  }
}
