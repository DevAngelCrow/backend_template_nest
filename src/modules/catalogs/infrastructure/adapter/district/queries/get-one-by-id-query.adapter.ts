import { GetDistrictHandler } from '@/modules/catalogs/application/district/queries/get-district/get-district.handler';
import { GetDistrictQuery } from '@/modules/catalogs/application/district/queries/get-district/get-district.query';
import { District } from '@/modules/catalogs/domain/entities/district';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDistrictQuery)
export class GetOneByIdDistrictQueryAdapter implements IQueryHandler<GetDistrictQuery> {
  constructor(private readonly handler: GetDistrictHandler) {}
  async execute(query: GetDistrictQuery): Promise<District | null> {
    return this.handler.execute(query);
  }
}
