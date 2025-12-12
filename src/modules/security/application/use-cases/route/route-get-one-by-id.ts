import { Route } from '@/modules/security/domain/entities/route';
import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { RoutesId } from '@/modules/security/domain/value-objects/routes-value-object/routes-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class RouteGetOneById {
  constructor(protected readonly repository: RouteRepository) {}
  async run(id: number): Promise<Route | null> {
    const route = await this.repository.getOneById(new RoutesId(id));
    if (!route) {
      throw new NotFoundException('Route', id.toString());
    }
    return route;
  }
}
