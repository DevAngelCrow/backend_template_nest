import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Route } from '../../domain/entities/route';
import { RoutesId } from '../../domain/value-objects/routes-value-object/routes-id';

export abstract class RouteReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Route> | Route[]>;
  abstract getOneById(id: RoutesId): Promise<Route | null>;
}
