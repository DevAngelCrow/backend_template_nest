import { Module } from '@nestjs/common';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { RouterModule } from '@nestjs/core';
import { UserController } from './infrastructure/controllers/user.controller';
import { serviceProviders } from './infrastructure/config/services.config';
import { respositories } from './infrastructure/config/repositories.config';

@Module({
  imports: [
    RouterModule.register([
      { path: 'identity', module: IdentityAccessManagementModule },
    ]),
  ],
  controllers: [UserController],
  providers: [...useCasesProviders, ...serviceProviders, ...respositories],
  exports: [...useCasesProviders, ...serviceProviders],
})
export class IdentityAccessManagementModule {}
