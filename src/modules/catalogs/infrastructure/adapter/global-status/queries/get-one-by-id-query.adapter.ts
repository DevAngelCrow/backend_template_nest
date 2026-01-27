import { GetGlobalStatusHandler } from '@/modules/catalogs/application/global-status/queries/get-global-status/get-global-status.handler';
import { GetGlobalStatusQuery } from '@/modules/catalogs/application/global-status/queries/get-global-status/get-global-status.query';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetGlobalStatusQuery)
export class GetOneByIdGlobalStatusQueryAdapter implements IQueryHandler<GetGlobalStatusQuery> {
  constructor(private readonly handler: GetGlobalStatusHandler) {}
  async execute(query: GetGlobalStatusQuery): Promise<GlobalStatus | null> {
    return this.handler.execute(query);
  }
}
