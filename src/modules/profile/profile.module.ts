import { Module } from '@nestjs/common';
import { PersonController } from './infrastructure/controllers/person.controller';

import { DocumentTypeController } from './infrastructure/controllers/document-type.controller';
import { DocumentController } from './infrastructure/controllers/document.controller';
import { AddressController } from './infrastructure/controllers/address.controller';
import { useCasesProviders } from './infrastructure/config/use-cases.config';
import { repositories } from './infrastructure/config/repositories.config';
import { serviceProviders } from './infrastructure/config/services.config';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    RouterModule.register([{ path: 'profile', module: ProfileModule }]),
  ],
  controllers: [
    PersonController,
    DocumentTypeController,
    DocumentController,
    AddressController,
  ],
  providers: [...useCasesProviders, ...repositories, ...serviceProviders],
  exports: [...serviceProviders, ...useCasesProviders],
})
export class ProfileModule {}
