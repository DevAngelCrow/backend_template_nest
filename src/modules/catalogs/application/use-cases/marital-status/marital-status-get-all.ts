import { MaritalStatus } from 'src/modules/catalogs/domain/entities/marital-status';
import { MaritalStatusRepository } from 'src/modules/catalogs/domain/repositories/marital-status-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class MaritalStatusGetAll {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<MaritalStatus> | MaritalStatus[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.maritalStatusRepository.getAll(
        paginationParams,
        filter,
      );
    }
    return await this.maritalStatusRepository.getAll(undefined, filter);
  }
}
