import { UserRepository } from '@/modules/auth/domain/repositories/user-repository';
import { UserName } from '@/modules/auth/domain/value-objects/user-value-object/user-name';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserGetOneByUserName {
  constructor(public readonly userRepository: UserRepository) {}
  public async run(user_name: string) {
    return await this.userRepository.getOneByUserName(new UserName(user_name));
  }
}
