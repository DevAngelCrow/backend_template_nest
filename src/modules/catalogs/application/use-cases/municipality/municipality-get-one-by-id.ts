import { Municipality } from 'src/modules/catalogs/domain/entities/municipality';
import { MunicipalityRespository } from 'src/modules/catalogs/domain/repositories/municipality-repository';
import { MunicipalityId } from 'src/modules/catalogs/domain/value-objects/municipality-value-object/municipality-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MunicipalityGetOneById {
  constructor(
    protected readonly municipalityRepository: MunicipalityRespository,
  ) {}
  public async run(id: number): Promise<Municipality | null> {
    const municipalityId = new MunicipalityId(id);
    const municipality =
      await this.municipalityRepository.getOneById(municipalityId);
    if (!municipality) {
      throw new NotFoundException('Municipality', id.toString());
    }
    return municipality;
  }
}
