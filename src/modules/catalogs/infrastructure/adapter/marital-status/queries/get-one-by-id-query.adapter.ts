import { GetMaritalStatusHandler } from '@/modules/catalogs/application/marital-status/queries/get-marital-status/get-marital-status.handler';
import { GetMaritalStatusQuery } from '@/modules/catalogs/application/marital-status/queries/get-marital-status/get-marital-status.query';
import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMaritalStatusQuery)
export class GetOneByIdMaritalStatusQueryAdapter implements IQueryHandler<GetMaritalStatusQuery> {
  constructor(private readonly handler: GetMaritalStatusHandler) {}
  async execute(query: GetMaritalStatusQuery): Promise<MaritalStatus | null> {
    return this.handler.execute(query);
  }
}
