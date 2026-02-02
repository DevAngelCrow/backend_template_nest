import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { RoutesId } from '@/modules/security/domain/value-objects/routes-value-object/routes-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class RouteDelete {
  constructor(protected readonly repository: RouteRepository) {}
  public async run(id: number): Promise<void> {
    const route = await this.repository.getOneById(new RoutesId(id));
    if (!route) {
      throw new NotFoundException('Route', id.toString());
    }
    const routeId = route.getId();
    if (!routeId) {
      throw new Error(`Route id is undefined`);
    }
    await this.repository.delete(routeId);
  }
}
