import { UserName } from '../../../identity-access-management/domain/value-objects/user-value-object/user-name';
import { UserPassword } from '../../../identity-access-management/domain/value-objects/user-value-object/user-password';

export abstract class CredentialsValidationPort {
  abstract validateCredentials(
    user_name: UserName,
    password: UserPassword,
    db_password: UserPassword,
  ): Promise<boolean>;
}
