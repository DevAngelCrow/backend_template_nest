import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
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

@Module({
  imports: [
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    ProfileModule,
    StorageModule,
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
  ],
  exports: [],
})
export class AuthModule {}
