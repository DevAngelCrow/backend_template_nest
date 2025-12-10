import { User } from '../../domain/entities/user';
import { UserGetOneByUserName } from '../use-cases/user/user-get-one-by-user-name';
export class FinduserService {
  constructor(private readonly findUserByName: UserGetOneByUserName) {}
  async run(user_name: string): Promise<User | null> {
    return await this.findUserByName.run(user_name);
  }
}
