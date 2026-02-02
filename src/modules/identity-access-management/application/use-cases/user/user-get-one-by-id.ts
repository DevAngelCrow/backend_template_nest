import { UserRepository } from '@/modules/identity-access-management/domain/repositories/user-repository';
import { UserId } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-id';

export class UserGetOneById {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(id: number) {
    return await this.userRepository.getOneById(new UserId(id));
  }
}
