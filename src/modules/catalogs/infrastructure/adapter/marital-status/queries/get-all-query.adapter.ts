import { GetMaritalStatusesHandler } from '@/modules/catalogs/application/marital-status/queries/get-marital-statuses/get-marital-statuses.handler';
import { GetMaritalStatusesQuery } from '@/modules/catalogs/application/marital-status/queries/get-marital-statuses/get-marital-statuses.query';
import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMaritalStatusesQuery)
export class GetAllMaritalStatusQueryAdapter implements IQueryHandler<GetMaritalStatusesQuery> {
  constructor(private readonly handler: GetMaritalStatusesHandler) {}
  async execute(
    query: GetMaritalStatusesQuery,
  ): Promise<Pagination<MaritalStatus> | MaritalStatus[]> {
    return this.handler.execute(query);
  }
}
