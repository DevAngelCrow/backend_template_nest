import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { UpdateRouteCommand } from './update-route.command';
import { Route } from '@/modules/security/domain/entities/route';

export class UpdateRouteHandler {
  constructor(private readonly repository: RouteRepository) {}

  async execute(command: UpdateRouteCommand): Promise<void> {
    const route = Route.create({ ...command.route_dto });
    await this.repository.update(route);
  }
}
