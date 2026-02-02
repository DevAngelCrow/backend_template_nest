import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Route } from '../entities/route';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { RoutesId } from '../value-objects/routes-value-object/routes-id';

export abstract class RouteRepository {
  abstract create(route: Route): Promise<Route>;
  abstract update(route: Route): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Route> | Route[]>;
  abstract getOneById(id: RoutesId): Promise<Route | null>;
  abstract delete(id: RoutesId): Promise<void>;
}
