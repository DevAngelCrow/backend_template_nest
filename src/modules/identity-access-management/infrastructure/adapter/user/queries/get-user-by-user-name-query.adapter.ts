import { GetUserByUserNameHandler } from '@/modules/identity-access-management/application/user/queries/get-user-by-user-name/get-user-by-user-name.handler';
import { GetUserByUserNameQuery } from '@/modules/identity-access-management/application/user/queries/get-user-by-user-name/get-user-by-user-name.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetUserByUserNameQuery)
export class GetUserByUserNameQueryAdapter implements IQueryHandler<GetUserByUserNameQuery> {
  constructor(private readonly handler: GetUserByUserNameHandler) {}
  async execute(query: GetUserByUserNameQuery) {
    return this.handler.execute(query);
  }
}
