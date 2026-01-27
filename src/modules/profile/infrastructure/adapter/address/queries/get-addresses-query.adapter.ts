import { GetAddressesHandler } from '@/modules/profile/application/address/queries/get-addresses/get-addresses.handler';
import { GetAddressesQuery } from '@/modules/profile/application/address/queries/get-addresses/get-addresses.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetAddressesQuery)
export class GetAddressesQueryAdapter implements IQueryHandler<GetAddressesQuery> {
  constructor(private readonly handler: GetAddressesHandler) {}
  async execute(query: GetAddressesQuery) {
    return this.handler.execute(query);
  }
}
