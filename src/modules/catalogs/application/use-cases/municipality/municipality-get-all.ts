import { Municipality } from 'src/modules/catalogs/domain/entities/municipality';
import { MunicipalityRespository } from 'src/modules/catalogs/domain/repositories/municipality-repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MunicipalityGetAll {
  constructor(protected readonly municipalityRepository: MunicipalityRespository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ municipalities: Municipality[]; total: number }> {
    return await this.municipalityRepository.getAll(page, per_page, filter);
  }
}
