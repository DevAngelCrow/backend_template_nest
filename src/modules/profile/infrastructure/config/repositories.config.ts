import { APP_GUARD } from '@nestjs/core';
import { AddressRepository } from '../../domain/repositories/address.repository';
import { DocumentTypeRepository } from '../../domain/repositories/document-type.repository';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { ImplAddressRepository } from '../implementation/impl-address.repository';
import { ImplDocumentTypeRepository } from '../implementation/impl-document-type.repository';
import { ImplDocumentRepository } from '../implementation/impl-document.repository';
import { ImplPersonRepository } from '../implementation/impl-person.repository';
import { JwtPassportAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-passport-auth.guard';

export const repositories = [
  { provide: PersonRepository, useClass: ImplPersonRepository },
  { provide: DocumentTypeRepository, useClass: ImplDocumentTypeRepository },
  { provide: DocumentRepository, useClass: ImplDocumentRepository },
  { provide: AddressRepository, useClass: ImplAddressRepository },
  { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
];
