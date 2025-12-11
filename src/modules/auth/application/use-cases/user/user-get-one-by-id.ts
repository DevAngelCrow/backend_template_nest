import { UserRepository } from '@/modules/auth/domain/repositories/user-repository';
import { UserId } from '@/modules/auth/domain/value-objects/user-value-object/user-id';

export class UserGetOneById {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(id: number) {
    return await this.userRepository.getOneById(new UserId(id));
  }
}
