import { District } from '@/modules/catalogs/domain/entities/district';
import { UpdateDistrictCommand } from './update-district.command';
import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DistrictQueriesRepository } from '../../../repositories/district-read.repository';

export class UpdateDistrictHandler {
  constructor(
    private readonly repository: DistrictRepository,
    private readonly readRepository: DistrictQueriesRepository,
  ) {}
  async execute(command: UpdateDistrictCommand): Promise<void> {
    const district = District.create({ ...command.district_dto });
    const districtId = district.getId();
    if (!districtId) {
      throw new Error(`District id is undefined`);
    }
    const foundDistrict = await this.readRepository.getOneById(districtId);
    if (!foundDistrict) {
      throw new NotFoundException('District', districtId.value().toString());
    }
    await this.repository.update(district);
  }
}
