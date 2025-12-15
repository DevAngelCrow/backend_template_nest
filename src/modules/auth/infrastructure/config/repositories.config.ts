import { APP_GUARD } from '@nestjs/core';
import { CredentialsValidationPort } from '../../domain/ports/credentials-validation.port';
import { EmailSenderPort } from '../../domain/ports/email-sender.port';
import { TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { UserRepository } from '../../../identity-access-management/domain/repositories/user-repository';
import { VerificationTokenRepository } from '../../domain/repositories/verification-token-repository';
import { ImplCredentialsValidatorPort } from '../implementation/auth-port-implementation/impl-credentials-validator.port';
import { ImplTokenGeneratorPort } from '../implementation/auth-port-implementation/impl-token-generator.port';
import { ImplUserRepository } from '../../../identity-access-management/infrastructure/implementation/impl-user.repository';
import { ImplVerificationTokenRepository } from '../implementation/impl-verification-token.repository';
import { EmailService } from '../services/email.service';
import { JwtPassportAuthGuard } from '../guards/jwt-passport-auth.guard';
import { HasVerifiedEmailPort } from '../../domain/ports/has-verified-email.port';
import { ImplHasVerifiedEmailPort } from '../implementation/auth-port-implementation/impl-has-verified-email.port';

export const repositories = [
  { provide: EmailSenderPort, useClass: EmailService },
  {
    provide: VerificationTokenRepository,
    useClass: ImplVerificationTokenRepository,
  },
  { provide: UserRepository, useClass: ImplUserRepository },
  { provide: TokenGeneratorPort, useClass: ImplTokenGeneratorPort },
  {
    provide: CredentialsValidationPort,
    useClass: ImplCredentialsValidatorPort,
  },
  {
    provide: HasVerifiedEmailPort,
    useClass: ImplHasVerifiedEmailPort,
  },
  {
    provide: APP_GUARD,
    useClass: JwtPassportAuthGuard,
  },
];
