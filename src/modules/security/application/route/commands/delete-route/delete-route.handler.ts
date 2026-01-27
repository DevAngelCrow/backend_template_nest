import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';
import { DeleteRouteCommand } from './delete-route.command';
import { RoutesId } from '@/modules/security/domain/value-objects/routes-value-object/routes-id';

export class DeleteRouteHandler {
  constructor(private readonly repository: RouteRepository) {}

  async execute(command: DeleteRouteCommand): Promise<void> {
    await this.repository.delete(new RoutesId(command.id));
  }
}
