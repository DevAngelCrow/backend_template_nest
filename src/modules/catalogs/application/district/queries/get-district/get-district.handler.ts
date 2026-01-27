import { District } from '@/modules/catalogs/domain/entities/district';
import { GetDistrictQuery } from './get-district.query';
import { DistrictId } from '@/modules/catalogs/domain/value-objects/district-value-object/district-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DistrictQueriesRepository } from '../../../repositories/district-read.repository';

export class GetDistrictHandler {
  constructor(private readonly repository: DistrictQueriesRepository) {}

  async execute(query: GetDistrictQuery): Promise<District | null> {
    const districtId = new DistrictId(query.id_district);
    const district = await this.repository.getOneById(districtId);
    if (!district) {
      throw new NotFoundException('District', query.id_district.toString());
    }
    return district;
  }
}
