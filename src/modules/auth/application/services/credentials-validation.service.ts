import { Injectable } from '@nestjs/common';
import { CredentialsValidationPort } from '../../domain/ports/credentials-validation.port';
import { UserName } from '../../domain/value-objects/user-value-object/user-name';
import { UserPassword } from '../../domain/value-objects/user-value-object/user-password';

@Injectable()
export class CredentialsValidationService {
  constructor(
    private readonly credentialsValidationPort: CredentialsValidationPort,
  ) {}
  async run(
    user_name: string,
    password: string,
    db_password: string,
  ): Promise<boolean> {
    const isValid = await this.credentialsValidationPort.validateCredentials(
      new UserName(user_name),
      new UserPassword(password),
      new UserPassword(db_password),
    );
    return isValid;
  }
}
