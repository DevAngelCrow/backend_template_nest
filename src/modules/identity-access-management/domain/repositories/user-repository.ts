import { User } from '../entities/user';
import { UserAuth } from '../entities/user-auth';
import { UserId } from '../value-objects/user-value-object/user-id';
// import { UserId } from '../value-objects/user-value-object/user-id';
import { UserName } from '../value-objects/user-value-object/user-name';

export abstract class UserRepository {
  public abstract create(user: User): Promise<User>;
  // public abstract update(user: User): Promise<void>;
  public abstract getOneById(id: UserId): Promise<User | null>;
  public abstract getOneByUserName(user_name: UserName): Promise<User | null>;
  public abstract markEmailAsVerified(user_id: UserId): Promise<void>;
  public abstract getOneByIdForAuth(id: UserId): Promise<UserAuth | null>;
}
