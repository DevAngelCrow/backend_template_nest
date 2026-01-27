import { Abstract, Type } from '@nestjs/common';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { AddressRepository } from '../../domain/repositories/address.repository';
import { DocumentTypeRepository } from '../../domain/repositories/document-type.repository';
import { CreatePersonHandler } from '../../application/person/commands/create-person/create-person.handler';
import { UpdatePersonHandler } from '../../application/person/commands/update-person/update-person.handler';
import { DeletePersonHandler } from '../../application/person/commands/delete-person/delete-person.handler';
import { CreateDocumentHandler } from '../../application/document/commands/create-document/create-document.handler';
import { UpdateDocumentHandler } from '../../application/document/commands/update-document/update-document.handler';
import { DeleteDocumentHandler } from '../../application/document/commands/delete-document/delete-document.handler';
import { CreateAddressHandler } from '../../application/address/commands/create-address/create-address.handler';
import { UpdateAddressHandler } from '../../application/address/commands/update-address/update-address.handler';
import { DeleteAddressHandler } from '../../application/address/commands/delete-address/delete-address.handler';
import { CreateDocumentTypeHandler } from '../../application/document-type/commands/create-document-type/create-document-type.handler';
import { UpdateDocumentTypeHandler } from '../../application/document-type/commands/update-document-type/update-document-type.handler';
import { DeleteDocumentTypeHandler } from '../../application/document-type/commands/delete-document-type/delete-document-type.handler';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { CreatePersonCommandAdapter } from '../adapter/person/commands/create-person-command.adapter';
import { UpdatePersonCommandAdapter } from '../adapter/person/commands/update-person-command.adapter';
import { DeletePersonCommandAdapter } from '../adapter/person/commands/delete-person-command.adapter';
import { CreateDocumentCommandAdapter } from '../adapter/document/commands/create-document-command.adapter';
import { UpdateDocumentCommandAdapter } from '../adapter/document/commands/update-document-command.adapter';
import { DeleteDocumentCommandAdapter } from '../adapter/document/commands/delete-document-command.adapter';
import { CreateAddressCommandAdapter } from '../adapter/address/commands/create-address-command.adapter';
import { UpdateAddressCommandAdapter } from '../adapter/address/commands/update-address-command.adapter';
import { DeleteAddressCommandAdapter } from '../adapter/address/commands/delete-address-command.adapter';
import { CreateDocumentTypeCommandAdapter } from '../adapter/document-type/commands/create-document-type-command.adapter';
import { UpdateDocumentTypeCommandAdapter } from '../adapter/document-type/commands/update-document-type-command.adapter';
import { DeleteDocumentTypeCommandAdapter } from '../adapter/document-type/commands/delete-document-type-command.adapter';

// Application Handlers Registration
export const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Person
  {
    handler: CreatePersonHandler,
    deps: [PersonRepository],
  },
  {
    handler: UpdatePersonHandler,
    deps: [PersonRepository],
  },
  {
    handler: DeletePersonHandler,
    deps: [PersonRepository],
  },
  // Document
  {
    handler: CreateDocumentHandler,
    deps: [DocumentRepository],
  },
  {
    handler: UpdateDocumentHandler,
    deps: [DocumentRepository],
  },
  {
    handler: DeleteDocumentHandler,
    deps: [DocumentRepository],
  },
  // Address
  {
    handler: CreateAddressHandler,
    deps: [AddressRepository],
  },
  {
    handler: UpdateAddressHandler,
    deps: [AddressRepository],
  },
  {
    handler: DeleteAddressHandler,
    deps: [AddressRepository],
  },
  // DocumentType
  {
    handler: CreateDocumentTypeHandler,
    deps: [DocumentTypeRepository],
  },
  {
    handler: UpdateDocumentTypeHandler,
    deps: [DocumentTypeRepository],
  },
  {
    handler: DeleteDocumentTypeHandler,
    deps: [DocumentTypeRepository],
  },
];

// CQRS NestJS Adapters (Infrastructure) Registration
export const commandAdapters = [
  CreatePersonCommandAdapter,
  UpdatePersonCommandAdapter,
  DeletePersonCommandAdapter,
  CreateDocumentCommandAdapter,
  UpdateDocumentCommandAdapter,
  DeleteDocumentCommandAdapter,
  CreateAddressCommandAdapter,
  UpdateAddressCommandAdapter,
  DeleteAddressCommandAdapter,
  CreateDocumentTypeCommandAdapter,
  UpdateDocumentTypeCommandAdapter,
  DeleteDocumentTypeCommandAdapter,
];

export const commandHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
