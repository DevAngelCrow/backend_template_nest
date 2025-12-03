import { District } from 'src/modules/catalogs/domain/entities/district';
import { DistrictRepository } from 'src/modules/catalogs/domain/repositories/district-repository';
import { Injectable } from '@nestjs/common';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
@Injectable()
export class DistrictGetAll {
  constructor(protected readonly districtRepository: DistrictRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<District> | District[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.districtRepository.getAll(paginationParams, filter);
    }
    return await this.districtRepository.getAll(undefined, filter);
  }
}
