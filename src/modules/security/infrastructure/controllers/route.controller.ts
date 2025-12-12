import { RouteCreate } from '../../application/use-cases/route/route-create';
import { RouteDelete } from '../../application/use-cases/route/route-delete';
import { RouteGetAll } from '../../application/use-cases/route/route-get-all';
import { RouteGetOneById } from '../../application/use-cases/route/route-get-one-by-id';
import { RouteUpdate } from '../../application/use-cases/route/route-update';

export class RouteController {
  constructor(
    private readonly routeCreate: RouteCreate,
    private readonly routeUpdate: RouteUpdate,
    private readonly routeGetAll: RouteGetAll,
    private readonly routeGetOneById: RouteGetOneById,
    private readonly routeDelete: RouteDelete,
  ) {}
}
