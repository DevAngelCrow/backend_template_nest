import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { Injectable } from '@nestjs/common';
import { DistrictDto } from '../../dtos/district.dto';
import { District } from '@/modules/catalogs/domain/entities/district';

@Injectable()
export class DistrictCreate {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(district_dto: DistrictDto): Promise<void> {
    const district = District.create({ ...district_dto });
    await this.districtRepository.create(district);
  }
}
