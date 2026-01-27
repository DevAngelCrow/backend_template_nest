import { GetDistrictsHandler } from '@/modules/catalogs/application/district/queries/get-districts/get-districts.handler';
import { GetDistrictsQuery } from '@/modules/catalogs/application/district/queries/get-districts/get-districts.query';
import { District } from '@/modules/catalogs/domain/entities/district';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDistrictsQuery)
export class GetAllDistrictQueryAdapter implements IQueryHandler<GetDistrictsQuery> {
  constructor(private readonly handler: GetDistrictsHandler) {}
  async execute(
    query: GetDistrictsQuery,
  ): Promise<Pagination<District> | District[]> {
    return this.handler.execute(query);
  }
}
