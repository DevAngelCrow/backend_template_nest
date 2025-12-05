import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserCreate } from './application/use-cases/user/user-create';
import { UserRepository } from './domain/repositories/user-repository';
import { ImplUserRepository } from './infrastructure/implementation/impl-user.repository';
import { UserGetOneByUserName } from './application/use-cases/user/user-get-one-by-user-name';

@Module({
  imports: [RouterModule.register([{ path: 'auth', module: AuthModule }])],
  controllers: [UserController],
  providers: [
    UserCreate,
    UserGetOneByUserName,
    {
      provide: UserRepository,
      useClass: ImplUserRepository,
    },
  ],
  exports: [],
})
export class AuthModule {}
