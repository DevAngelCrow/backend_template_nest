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

@Module({
  imports: [
    RouterModule.register([{ path: 'auth', module: AuthModule }]),
    ProfileModule,
    StorageModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    UserCreate,
    UserGetOneByUserName,
    Register,
    {
      provide: UserRepository,
      useClass: ImplUserRepository,
    },
  ],
  exports: [],
})
export class AuthModule {}
