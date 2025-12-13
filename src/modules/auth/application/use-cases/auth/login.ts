import { CredentialsValidationPort } from '@/modules/auth/domain/ports/credentials-validation.port';
import { FinduserService } from '../../../../identity-access-management/application/services/find-user.service';
import { TokenGeneratorPort } from '@/modules/auth/domain/ports/token-generator.port';
import { UserName } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-name';
import { UserPassword } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-password';
import { AuthenticateDto } from '../../dtos/authenticate.dto';
import { UnauthorizedException } from '@/shared/application/exceptions/unauthorized.exception';
export class Login {
  constructor(
    private readonly credentialsValidationPort: CredentialsValidationPort,
    private readonly tokenGenerator: TokenGeneratorPort,
    private readonly findUserService: FinduserService,
  ) {}
  async run(user_name: string, passsword: string): Promise<AuthenticateDto> {
    const userExists = await this.findUserService.run(user_name);
    if (!userExists) {
      new UnauthorizedException('Invalid credentials');
    }
    const userId = userExists?.getId();
    const userPassword = userExists?.getPassword();
    if (!userId || !userPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const credentialsValid =
      await this.credentialsValidationPort.validateCredentials(
        new UserName(user_name),
        new UserPassword(passsword),
        userPassword,
      );
    if (!credentialsValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.tokenGenerator.generateToken(
      new UserName(user_name),
      userId,
    );

    return new AuthenticateDto(user_name, userId.value(), token);
  }
}
