import { Route } from '@/modules/security/domain/entities/route';
import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class RouteGetAll {
  constructor(protected readonly repository: RouteRepository) {}
  async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Route> | Route[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.repository.getAll(paginationParams, filter);
    }
    return await this.repository.getAll(undefined, filter);
  }
}
