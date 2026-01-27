import { GetRoutesHandler } from '@/modules/security/application/route/queries/get-routes/get-routes.handler';
import { GetRoutesQuery } from '@/modules/security/application/route/queries/get-routes/get-routes.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRoutesQuery)
export class GetRoutesQueryAdapter implements IQueryHandler<GetRoutesQuery> {
  constructor(private readonly handler: GetRoutesHandler) {}
  async execute(query: GetRoutesQuery) {
    return this.handler.execute(query);
  }
}
