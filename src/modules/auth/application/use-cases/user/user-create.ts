import { UserRepository } from '@/modules/auth/domain/repositories/user-repository';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';
import { User } from '@/modules/auth/domain/entities/user';

@Injectable()
export class UserCreate {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(user_dto: UserDto): Promise<User> {
    const user = User.create({ ...user_dto });
    return await this.userRepository.create(user);
  }
}
