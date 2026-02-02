import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { RouteDto } from '../../dtos/route.dto';
import { Route } from '@/modules/security/domain/entities/route';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class RouteUpdate {
  constructor(protected readonly repository: RouteRepository) {}
  async run(route_dto: RouteDto): Promise<void> {
    const route = Route.create({
      ...route_dto,
    });
    const routeId = route.getId();
    if (!routeId) {
      throw new Error('Route ID is required for update.');
    }
    const findRoute = await this.repository.getOneById(routeId);
    if (!findRoute) {
      throw new NotFoundException('Route', routeId.value().toString());
    }
    await this.repository.update(route);
  }
}
