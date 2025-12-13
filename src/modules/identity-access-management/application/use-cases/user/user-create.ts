import { UserRepository } from '@/modules/identity-access-management/domain/repositories/user-repository';
import { UserDto } from '../../../../identity-access-management/application/dtos/user.dto';
import { User } from '@/modules/identity-access-management/domain/entities/user';

export class UserCreate {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(user_dto: UserDto): Promise<User> {
    const user = User.create({ ...user_dto });
    return await this.userRepository.create(user);
  }
}
