import { Municipality } from 'src/modules/catalogs/domain/entities/municipality';
import { MunicipalityRespository } from 'src/modules/catalogs/domain/repositories/municipality-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class MunicipalityGetAll {
  constructor(
    protected readonly municipalityRepository: MunicipalityRespository,
  ) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Municipality> | Municipality[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.municipalityRepository.getAll(paginationParams, filter);
    }
    return await this.municipalityRepository.getAll(undefined, filter);
  }
}
