import { GetGlobalStatusesHandler } from '@/modules/catalogs/application/global-status/queries/get-global-statuses/get-global-statuses.handler';
import { GetGlobalStatusesQuery } from '@/modules/catalogs/application/global-status/queries/get-global-statuses/get-global-statuses.query';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetGlobalStatusesQuery)
export class GetAllGlobalStatusQueryAdapter implements IQueryHandler<GetGlobalStatusesQuery> {
  constructor(private readonly handler: GetGlobalStatusesHandler) {}
  async execute(
    query: GetGlobalStatusesQuery,
  ): Promise<Pagination<GlobalStatus> | GlobalStatus[]> {
    return this.handler.execute(query);
  }
}
