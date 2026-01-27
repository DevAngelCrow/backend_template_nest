import { GetMunicipalitiesHandler } from '@/modules/catalogs/application/municipality/queries/get-municipalities/get-municipalities.handler';
import { GetMunicipalitiesQuery } from '@/modules/catalogs/application/municipality/queries/get-municipalities/get-municipalities.query';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMunicipalitiesQuery)
export class GetAllMunicipalityQueryAdapter implements IQueryHandler<GetMunicipalitiesQuery> {
  constructor(private readonly handler: GetMunicipalitiesHandler) {}
  async execute(
    query: GetMunicipalitiesQuery,
  ): Promise<Pagination<Municipality> | Municipality[]> {
    return this.handler.execute(query);
  }
}
