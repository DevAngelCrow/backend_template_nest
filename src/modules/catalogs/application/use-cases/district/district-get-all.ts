import { District } from 'src/modules/catalogs/domain/entities/district';
import { DistrictRepository } from 'src/modules/catalogs/domain/repositories/district-repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class DistrictGetAll {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ districts: District[]; total: number }> {
    return await this.districtRepository.getAll(page, per_page, filter);
  }
}
