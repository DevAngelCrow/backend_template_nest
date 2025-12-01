import { District } from 'src/modules/catalogs/domain/entities/district';
import { DistrictRepository } from 'src/modules/catalogs/domain/repositories/district-repository';
import { DistrictId } from 'src/modules/catalogs/domain/value-objects/district-value-object/district-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DistrictGetOneById {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(id: number): Promise<District | null> {
    const districtId = new DistrictId(id);
    const district = await this.districtRepository.getOneById(districtId);
    if (!district) {
      throw new NotFoundException('District', id.toString());
    }
    return district;
  }
}
