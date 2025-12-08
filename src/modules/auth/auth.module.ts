import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserCreate } from './application/use-cases/user/user-create';
import { UserRepository } from './domain/repositories/user-repository';
import { ImplUserRepository } from './infrastructure/implementation/impl-user.repository';
import { UserGetOneByUserName } from './application/use-cases/user/user-get-one-by-user-name';
import { Register } from './application/use-cases/auth/register';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { ProfileModule } from '../profile/profile.module';
import { StorageModule } from '../storage/storage.module';
import { Login } from './application/use-cases/auth/login';
import { TokenGeneratorPort } from './domain/ports/token-generator.port';
import { ImplTokenGeneratorPort } from './infrastructure/implementation/auth-port-implementation/impl-token-generator.port';
import { TokenGeneratorService } from './application/services/token-generator.service';
import { JwtModule } from '@nestjs/jwt';
import { FinduserService } from './application/services/find-user.service';
import { CredentialsValidationService } from './application/services/credentials-validation.service';
import { CredentialsValidationPort } from './domain/ports/credentials-validation.port';
import { ImplCredentialsValidatorPort } from './infrastructure/implementation/auth-port-implementation/impl-credentials-validator.port';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { JwtPassportAuthGuard } from './infrastructure/guards/jwt-passport-auth.guard';
import { SendVerificationEmail } from './application/use-cases/email/send-verification-email';
import { VerifyEmail } from './application/use-cases/email/verify-email';
import { EmailSenderPort } from './domain/ports/email-sender.port';
import { EmailService } from './infrastructure/services/email.service';
import { VerificationTokenRepository } from './domain/repositories/verification-token-repository';
import { ImplVerificationTokenRepository } from './infrastructure/implementation/impl-verification-token.repository';

@Module({
  imports: [
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    ProfileModule,
    StorageModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserCreate,
    UserGetOneByUserName,
    Register,
    Login,
    TokenGeneratorService,
    CredentialsValidationService,
    FinduserService,
    JwtStrategy,
    SendVerificationEmail,
    VerifyEmail,
    {
      provide: EmailSenderPort,
      useClass: EmailService,
    },
    {
      provide: VerificationTokenRepository,
      useClass: ImplVerificationTokenRepository,
    },
    {
      provide: UserRepository,
      useClass: ImplUserRepository,
    },
    {
      provide: TokenGeneratorPort,
      useClass: ImplTokenGeneratorPort,
    },
    {
      provide: CredentialsValidationPort,
      useClass: ImplCredentialsValidatorPort,
    },
    {
      provide: APP_GUARD,
      useClass: JwtPassportAuthGuard,
    },
  ],
  exports: [],
})
export class AuthModule {}
