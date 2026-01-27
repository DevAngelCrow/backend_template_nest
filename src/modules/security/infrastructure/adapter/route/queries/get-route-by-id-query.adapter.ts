import { GetRouteByIdHandler } from '@/modules/security/application/route/queries/get-route-by-id/get-route-by-id.handler';
import { GetRouteByIdQuery } from '@/modules/security/application/route/queries/get-route-by-id/get-route-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRouteByIdQuery)
export class GetRouteByIdQueryAdapter implements IQueryHandler<GetRouteByIdQuery> {
  constructor(private readonly handler: GetRouteByIdHandler) {}
  async execute(query: GetRouteByIdQuery) {
    return this.handler.execute(query);
  }
}
