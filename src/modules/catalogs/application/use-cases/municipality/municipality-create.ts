import { MunicipalityRespository } from '@/modules/catalogs/domain/repositories/municipality-repository';
import { Injectable } from '@nestjs/common';
import { MunicipalityDto } from '../../dtos/municipality.dto';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';

@Injectable()
export class MunicipalityCreate {
  constructor(
    protected readonly municipalityRepository: MunicipalityRespository,
  ) {}
  public async run(municipality_dto: MunicipalityDto): Promise<void> {
    const municipality = Municipality.create({ ...municipality_dto });
    await this.municipalityRepository.create(municipality);
  }
}
