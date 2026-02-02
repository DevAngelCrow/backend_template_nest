import { Module } from '@nestjs/common';
import { PersonController } from './infrastructure/controllers/person.controller';

import { DocumentTypeController } from './infrastructure/controllers/document-type.controller';
import { DocumentController } from './infrastructure/controllers/document.controller';
import { AddressController } from './infrastructure/controllers/address.controller';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { serviceProviders } from './infrastructure/config/services.config';
import { RouterModule } from '@nestjs/core';
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
    RouterModule.register([{ path: 'profile', module: ProfileModule }]),
    CqrsModule,
  ],
  controllers: [
    PersonController,
    DocumentTypeController,
    DocumentController,
    AddressController,
  ],
  providers: [
    ...useCasesProviders,
    ...repositories,
    ...serviceProviders,
    ...commandHandlerProviders,
    ...commandAdapters,
    ...queryHandlerProviders,
    ...queryAdapters,
  ],
  exports: [
    ...serviceProviders,
    ...useCasesProviders,
    ...commandHandlerProviders,
    ...queryHandlerProviders,
  ],
})
export class ProfileModule {}
