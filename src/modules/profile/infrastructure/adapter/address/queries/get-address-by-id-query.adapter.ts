import { GetAddressByIdHandler } from '@/modules/profile/application/address/queries/get-address-by-id/get-address-by-id.handler';
import { GetAddressByIdQuery } from '@/modules/profile/application/address/queries/get-address-by-id/get-address-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAddressByIdQuery)
export class GetAddressByIdQueryAdapter implements IQueryHandler<GetAddressByIdQuery> {
  constructor(private readonly handler: GetAddressByIdHandler) {}
  async execute(query: GetAddressByIdQuery) {
    return this.handler.execute(query);
  }
}
