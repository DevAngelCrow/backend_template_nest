import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { DistrictDto } from '../../dtos/district.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { District } from '@/modules/catalogs/domain/entities/district';

export class DistrictUpdate {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(district_dto: DistrictDto): Promise<void> {
    const district = District.create({ ...district_dto });
    const districtId = district.getId();
    if (!districtId) {
      throw new Error(`District id is undefined`);
    }
    const foundDistrict = await this.districtRepository.getOneById(districtId);
    if (!foundDistrict) {
      throw new NotFoundException('District', districtId.value().toString());
    }
    await this.districtRepository.update(district);
  }
}
