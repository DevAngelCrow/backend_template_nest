import { UserName } from '../value-objects/user-value-object/user-name';
import { UserPassword } from '../value-objects/user-value-object/user-password';

export abstract class CredentialsValidationPort {
  abstract validateCredentials(
    user_name: UserName,
    password: UserPassword,
    db_password: UserPassword,
  ): Promise<boolean>;
}
