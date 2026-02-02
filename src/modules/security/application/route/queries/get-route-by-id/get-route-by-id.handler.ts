import { RouteRepository } from '@/modules/security/domain/repositories/route-repository';

import { GetRouteByIdQuery } from './get-route-by-id.query';
import { RoutesId } from '@/modules/security/domain/value-objects/routes-value-object/routes-id';

export class GetRouteByIdHandler {
  constructor(private readonly repository: RouteRepository) {}

  async execute(query: GetRouteByIdQuery) {
    return await this.repository.getOneById(new RoutesId(query.id));
  }
}
