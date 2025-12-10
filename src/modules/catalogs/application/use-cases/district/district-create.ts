import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { DistrictDto } from '../../dtos/district.dto';
import { District } from '@/modules/catalogs/domain/entities/district';

export class DistrictCreate {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(district_dto: DistrictDto): Promise<void> {
    const district = District.create({ ...district_dto });
    await this.districtRepository.create(district);
  }
}
