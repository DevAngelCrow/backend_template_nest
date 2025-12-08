import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { PersonController } from './infrastructure/controllers/person.controller';
import { PersonCreate } from './application/use-cases/person/person-create';
import { PersonRepository } from './domain/repositories/person.repository';
import { ImplPersonRepository } from './infrastructure/implementation/impl-person.repository';
import { PersonGetAll } from './application/use-cases/person/person-get-all';
import { PersonGetOneByEmail } from './application/use-cases/person/person-get-one-by-email';
import { PersonGetOneById } from './application/use-cases/person/person-get-one-by-id';
import PersonUpdate from './application/use-cases/person/person-update';
import { DocumentTypeController } from './infrastructure/controllers/document-type.controller';
import { DocumentTypeCreate } from './application/use-cases/document-type/document-type-create';
import { DocumentTypeUpdate } from './application/use-cases/document-type/document-type-update';
import { DocumentTypeGetAll } from './application/use-cases/document-type/document-type-get-all';
import { DocumentTypeGetOneById } from './application/use-cases/document-type/document-type-get-one-by-id';
import { DocumentTypeDelete } from './application/use-cases/document-type/document-type-delete';
import { DocumentTypeRepository } from './domain/repositories/document-type.repository';
import { ImplDocumentTypeRepository } from './infrastructure/implementation/impl-document-type.repository';
import { DocumentController } from './infrastructure/controllers/document.controller';
import { DocumentCreate } from './application/use-cases/document/document-create';
import { DocumentUpdate } from './application/use-cases/document/document-update';
import { DocumentGetAll } from './application/use-cases/document/document-get-all';
import { DocumentGetOneById } from './application/use-cases/document/document-get-one-by-id';
import { DocumentDelete } from './application/use-cases/document/document-delete';
import { DocumentRepository } from './domain/repositories/document.repository';
import { ImplDocumentRepository } from './infrastructure/implementation/impl-document.repository';
import { AddressController } from './infrastructure/controllers/address.controller';
import { AddressCreate } from './application/use-cases/address/address-create';
import { AddressUpdate } from './application/use-cases/address/address-update';
import { AddressGetAll } from './application/use-cases/address/address-get-all';
import { AddressGetOneById } from './application/use-cases/address/address-get-one-by-id';
import { AddressDelete } from './application/use-cases/address/address-delete';
import { AddressRepository } from './domain/repositories/address.repository';
import { ImplAddressRepository } from './infrastructure/implementation/impl-address.repository';
import { PersonCreateService } from './application/services/person/person-create.service';
import { AddressCreateService } from './application/services/address/address-create.service';
import { DocumentCreateService } from './application/services/document/document-create.service';
import { JwtPassportAuthGuard } from '../auth/infrastructure/guards/jwt-passport-auth.guard';

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
  providers: [
    PersonCreateService,
    PersonCreate,
    PersonGetAll,
    PersonGetOneByEmail,
    PersonUpdate,
    PersonGetOneById,
    { provide: PersonRepository, useClass: ImplPersonRepository },
    DocumentTypeCreate,
    DocumentTypeUpdate,
    DocumentTypeGetAll,
    DocumentTypeGetOneById,
    DocumentTypeDelete,
    { provide: DocumentTypeRepository, useClass: ImplDocumentTypeRepository },
    DocumentCreateService,
    DocumentCreate,
    DocumentUpdate,
    DocumentGetAll,
    DocumentGetOneById,
    DocumentDelete,
    { provide: DocumentRepository, useClass: ImplDocumentRepository },
    AddressCreateService,
    AddressCreate,
    AddressUpdate,
    AddressGetAll,
    AddressGetOneById,
    AddressDelete,
    { provide: AddressRepository, useClass: ImplAddressRepository },
    { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
  ],
  exports: [
    PersonCreate,
    PersonCreateService,
    AddressCreateService,
    DocumentCreateService,
  ],
})
export class ProfileModule {}
