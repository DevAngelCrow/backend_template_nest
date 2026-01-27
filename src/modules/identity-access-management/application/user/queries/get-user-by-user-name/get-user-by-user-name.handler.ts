import { UserRepository } from '@/modules/identity-access-management/domain/repositories/user-repository';
import { UserName } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-name';
import { GetUserByUserNameQuery } from './get-user-by-user-name.query';

export class GetUserByUserNameHandler {
  constructor(private readonly repository: UserRepository) {}

  async execute(query: GetUserByUserNameQuery) {
    return await this.repository.getOneByUserName(
      new UserName(query.user_name),
    );
  }
}
