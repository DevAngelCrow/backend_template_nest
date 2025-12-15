import { UserAuth } from '../../domain/entities/user-auth';
import { UserAuthGetOneByUserName } from '../use-cases/user/user-auth-get-one-by-user-name';
export class FindUserAuthByNameService {
  constructor(private readonly findUserByName: UserAuthGetOneByUserName) {}
  async run(user_name: string): Promise<UserAuth | null> {
    return await this.findUserByName.run(user_name);
  }
}
