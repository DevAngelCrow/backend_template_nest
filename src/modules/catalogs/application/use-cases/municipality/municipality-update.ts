import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { MunicipalityDto } from '../../dtos/municipality.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MunicipalityUpdate {
  constructor(
    protected readonly municipalityRepository: MunicipalityRespository,
  ) {}
  public async run(municipality_dto: MunicipalityDto): Promise<void> {
    const municipality = Municipality.create({ ...municipality_dto });
    const municipalityId = municipality.getId();
    if (!municipalityId) {
      throw new Error(`Municipality id is undefined`);
    }
    const foundMunicipality =
      await this.municipalityRepository.getOneById(municipalityId);
    if (!foundMunicipality) {
      throw new NotFoundException(
        'Municipality',
        municipalityId.value().toString(),
      );
    }
    await this.municipalityRepository.update(municipality);
  }
}
