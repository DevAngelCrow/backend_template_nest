import { Pagination } from '@/shared/domain/value-object/pagination';
import { Route } from '@/modules/security/domain/entities/route';
import { GetRoutesQuery } from './get-routes.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';

export class GetRoutesHandler {
  constructor(private readonly repository: RouteRepository) {}
  async execute(query: GetRoutesQuery): Promise<Pagination<Route> | Route[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
