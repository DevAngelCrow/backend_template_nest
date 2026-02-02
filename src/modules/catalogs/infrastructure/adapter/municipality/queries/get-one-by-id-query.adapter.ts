import { GetMunicipalityHandler } from '@/modules/catalogs/application/municipality/queries/get-municipality/get-municipality.handler';
import { GetMunicipalityQuery } from '@/modules/catalogs/application/municipality/queries/get-municipality/get-municipality.query';
import { Municipality } from '@/modules/catalogs/domain/entities/municipality';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMunicipalityQuery)
export class GetOneByIdMunicipalityQueryAdapter implements IQueryHandler<GetMunicipalityQuery> {
  constructor(private readonly handler: GetMunicipalityHandler) {}
  async execute(query: GetMunicipalityQuery): Promise<Municipality | null> {
    return this.handler.execute(query);
  }
}
