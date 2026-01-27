import { Module } from '@nestjs/common';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { RouterModule } from '@nestjs/core';
import { UserController } from './infrastructure/controllers/user.controller';
import { serviceProviders } from './infrastructure/config/services.config';
import { respositories } from './infrastructure/config/repositories.config';
import { CqrsModule } from '@nestjs/cqrs';
import {
  commandAdapters,
  commandHandlerProviders,
} from './infrastructure/config/commands-handlers.config';
import {
  queryAdapters,
  queryHandlerProviders,
} from './infrastructure/config/queries-handlers.config';

@Module({
  imports: [
    RouterModule.register([
      { path: 'identity', module: IdentityAccessManagementModule },
    ]),
    CqrsModule,
  ],
  controllers: [UserController],
  providers: [
    ...useCasesProviders,
    ...serviceProviders,
    ...respositories,
    ...commandHandlerProviders,
    ...commandAdapters,
    ...queryHandlerProviders,
    ...queryAdapters,
  ],
  exports: [
    ...useCasesProviders,
    ...serviceProviders,
    ...commandHandlerProviders,
    ...queryHandlerProviders,
  ],
})
export class IdentityAccessManagementModule {}
