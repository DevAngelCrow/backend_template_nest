import { Route } from '@/modules/security/domain/entities/route';
import { RouteDto } from '../../dtos/route.dto';
import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';

export class RouteCreate {
  constructor(protected readonly repository: RouteRepository) {}
  public async run(route_dto: RouteDto): Promise<Route> {
    const route = Route.create({
      ...route_dto,
    });
    await this.repository.create(route);
    return route;
  }
}
