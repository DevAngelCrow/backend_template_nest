import { CredentialsValidationPort } from '@/modules/auth/domain/ports/credentials-validation.port';
import { TokenGeneratorPort } from '@/modules/auth/domain/ports/token-generator.port';
import { UserName } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-name';
import { UserPassword } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-password';
import { AuthenticateDto } from '../../dtos/authenticate.dto';
import { UnauthorizedException } from '@/shared/application/exceptions/unauthorized.exception';
import { HasVerifiedEmailPort } from '@/modules/auth/domain/ports/has-verified-email.port';
import { UserAuth } from '@/modules/identity-access-management/domain/entities/user-auth';
import { FinduserService } from '@/modules/identity-access-management/application/services/find-user.service';
export class Login {
  constructor(
    private readonly credentialsValidationPort: CredentialsValidationPort,
    private readonly tokenGenerator: TokenGeneratorPort,
    private readonly findUserService: FinduserService,
    private readonly userEmailVerification: HasVerifiedEmailPort,
  ) {}
  async run(user_name: string, passsword: string): Promise<AuthenticateDto> {
    const userExists = await this.findUserService.run(user_name);
    if (!userExists) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const userId = userExists?.user.getId();
    const userPassword = userExists?.user.getPassword();
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
    const emailVerified = await this.userEmailVerification.hasVerifiedEmail(
      userExists.user,
    );
    if (!emailVerified) {
      throw new UnauthorizedException('Email not verified');
    }
    const userAuth = UserAuth.create({
      id_people: userExists.user.getIdPeople().value(),
      user_name: userExists.user.getUserName().value(),
      id_status: userExists.user.getIdStatus().value(),
      last_access: userExists.user.getLastAccess().value(),
      is_validated: userExists.user.getIsValidated().value(),
      permissions: userExists.permissions,
      id: userId.value(),
    });
    const token = await this.tokenGenerator.generateToken(userAuth);

    return new AuthenticateDto(user_name, userId.value(), token);
  }
}
