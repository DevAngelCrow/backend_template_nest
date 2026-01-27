import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { CreateRouteCommand } from './create-route.command';
import { Route } from '@/modules/security/domain/entities/route';

export class CreateRouteHandler {
  constructor(private readonly repository: RouteRepository) {}

  async execute(command: CreateRouteCommand): Promise<void> {
    const route = Route.create({ ...command.route_dto });
    await this.repository.create(route);
  }
}
