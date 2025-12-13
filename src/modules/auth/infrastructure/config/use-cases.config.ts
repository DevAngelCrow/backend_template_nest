import { Abstract, Type } from '@nestjs/common';
import { UserRepository } from '../../../identity-access-management/domain/repositories/user-repository';
import { Register } from '../../application/use-cases/auth/register';
import { PersonCreateService } from '@/modules/profile/application/services/person/person-create.service';
import { DocumentCreateService } from '@/modules/profile/application/services/document/document-create.service';
import { StorageUploadService } from '@/modules/storage/application/services/storage/storage-upload.service';
import { SendVerificationEmail } from '../../application/use-cases/email/send-verification-email';
import { Login } from '../../application/use-cases/auth/login';
import { CredentialsValidationPort } from '../../domain/ports/credentials-validation.port';
import { TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { FinduserService } from '../../../identity-access-management/application/services/find-user.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { EmailSenderPort } from '../../domain/ports/email-sender.port';
import { VerificationTokenRepository } from '../../domain/repositories/verification-token-repository';
import { VerifyEmail } from '../../application/use-cases/email/verify-email';
import { registerUseCase } from '@/shared/infrastructure/factories/register-use-case.factory';
import { AddressCreateService } from '@/modules/profile/application/services/address/address-create.service';
import { CreateUserService } from '@/modules/identity-access-management/application/services/create-user.service';

export const useCases: Array<{
  useCase: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    useCase: Register,
    deps: [
      CreateUserService,
      PersonCreateService,
      AddressCreateService,
      DocumentCreateService,
      StorageUploadService,
      SendVerificationEmail,
    ],
  },
  {
    useCase: Login,
    deps: [CredentialsValidationPort, TokenGeneratorPort, FinduserService],
  },
  {
    useCase: SendVerificationEmail,
    deps: [EmailSenderPort, VerificationTokenRepository],
  },
  {
    useCase: JwtStrategy,
    deps: [UserRepository],
  },
  {
    useCase: VerifyEmail,
    deps: [VerificationTokenRepository, UserRepository],
  },
];

export const useCasesProviders = useCases.map((uc) => {
  return registerUseCase(uc.useCase, uc.deps);
});
