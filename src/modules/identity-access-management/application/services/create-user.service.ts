import { User } from '../../domain/entities/user';
import { UserDto } from '../dtos/user.dto';
import { UserCreate } from '../use-cases/user/user-create';
export class CreateUserService {
  constructor(private readonly createUser: UserCreate) {}
  async run(user_dto: UserDto): Promise<User> {
    return await this.createUser.run(user_dto);
  }
}
