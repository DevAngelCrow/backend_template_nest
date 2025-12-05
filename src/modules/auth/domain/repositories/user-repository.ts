import { User } from '../entities/user';
// import { UserId } from '../value-objects/user-value-object/user-id';
import { UserName } from '../value-objects/user-value-object/user-name';

export abstract class UserRepository {
  public abstract create(user: User): Promise<User>;
  // public abstract update(user: User): Promise<void>;
  // public abstract getOneById(id: UserId): Promise<User | null>;
  public abstract getOneByUserName(user_name: UserName): Promise<User | null>;
}
