import { GetUserByIdHandler } from '@/modules/identity-access-management/application/user/queries/get-user-by-id/get-user-by-id.handler';
import { GetUserByIdQuery } from '@/modules/identity-access-management/application/user/queries/get-user-by-id/get-user-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryAdapter implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly handler: GetUserByIdHandler) {}
  async execute(query: GetUserByIdQuery) {
    return this.handler.execute(query);
  }
}
