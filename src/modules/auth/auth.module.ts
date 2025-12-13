import { Module } from '@nestjs/common';
import { UserController } from '../identity-access-management/infrastructure/controllers/user.controller';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { ProfileModule } from '../profile/profile.module';
import { StorageModule } from '../storage/storage.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { serviceProviders } from './infrastructure/config/services.config';
import { RouterModule } from '@nestjs/core';
import { IdentityAccessManagementModule } from '../identity-access-management/identity-access-management.module';

@Module({
  imports: [
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    ProfileModule,
    StorageModule,
    IdentityAccessManagementModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UserController, AuthController],
  providers: [...useCasesProviders, ...serviceProviders, ...repositories],
  exports: [...useCasesProviders, ...serviceProviders],
})
export class AuthModule {}
