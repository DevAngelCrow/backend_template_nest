import { UserId } from '../value-objects/user-value-object/user-id';
import { UserName } from '../value-objects/user-value-object/user-name';

export abstract class TokenGeneratorPort {
  abstract generateToken(user_name: UserName, id: UserId): Promise<string>;
}
