import { UserRepository } from '@/modules/identity-access-management/domain/repositories/user-repository';
import { UserName } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-name';

export class UserGetOneByUserName {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(user_name: string) {
    return await this.userRepository.getOneByUserName(new UserName(user_name));
  }
}
