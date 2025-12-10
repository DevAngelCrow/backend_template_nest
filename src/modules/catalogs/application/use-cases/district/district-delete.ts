import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { DistrictId } from '@/modules/catalogs/domain/value-objects/district-value-object/district-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class DistrictDelete {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(id: number): Promise<void> {
    const district = await this.districtRepository.getOneById(
      new DistrictId(id),
    );
    if (!district) {
      throw new NotFoundException('District', id.toString());
    }
    const districtId = district.getId();
    if (!districtId) {
      throw new Error(`District id is undefined`);
    }
    await this.districtRepository.delete(districtId);
  }
}
