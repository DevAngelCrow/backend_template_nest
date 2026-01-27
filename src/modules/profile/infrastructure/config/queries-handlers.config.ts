import { Abstract, Type } from '@nestjs/common';
import { GetPeopleHandler } from '../../application/person/queries/get-people/get-people.handler';
import { GetPersonByIdHandler } from '../../application/person/queries/get-person-by-id/get-person-by-id.handler';
import { GetPersonByEmailHandler } from '../../application/person/queries/get-person-by-email/get-person-by-email.handler';
import { GetDocumentsHandler } from '../../application/document/queries/get-documents/get-documents.handler';
import { GetDocumentByIdHandler } from '../../application/document/queries/get-document-by-id/get-document-by-id.handler';
import { GetAddressesHandler } from '../../application/address/queries/get-addresses/get-addresses.handler';
import { GetAddressByIdHandler } from '../../application/address/queries/get-address-by-id/get-address-by-id.handler';
import { GetDocumentTypesHandler } from '../../application/document-type/queries/get-document-types/get-document-types.handler';
import { GetDocumentTypeByIdHandler } from '../../application/document-type/queries/get-document-type-by-id/get-document-type-by-id.handler';
import { GetPeopleQueryAdapter } from '../adapter/person/queries/get-people-query.adapter';
import { GetPersonByIdQueryAdapter } from '../adapter/person/queries/get-person-by-id-query.adapter';
import { GetPersonByEmailQueryAdapter } from '../adapter/person/queries/get-person-by-email-query.adapter';
import { GetDocumentsQueryAdapter } from '../adapter/document/queries/get-documents-query.adapter';
import { GetDocumentByIdQueryAdapter } from '../adapter/document/queries/get-document-by-id-query.adapter';
import { GetAddressesQueryAdapter } from '../adapter/address/queries/get-addresses-query.adapter';
import { GetAddressByIdQueryAdapter } from '../adapter/address/queries/get-address-by-id-query.adapter';
import { GetDocumentTypesQueryAdapter } from '../adapter/document-type/queries/get-document-types-query.adapter';
import { GetDocumentTypeByIdQueryAdapter } from '../adapter/document-type/queries/get-document-type-by-id-query.adapter';
import { registerCqrsHandler } from '@/shared/infrastructure/factories/register-cqrs-handlers.factory';
import { PersonReadRepository } from '../../application/repositories/person-read.repository';
import { DocumentReadRepository } from '../../application/repositories/document-read.repository';
import { AddressReadRepository } from '../../application/repositories/address-read.repository';
import { DocumentTypeReadRepository } from '../../application/repositories/document-type-read.repository';

const applicationHandlers: Array<{
  handler: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  // Person
  {
    handler: GetPeopleHandler,
    deps: [PersonReadRepository],
  },
  {
    handler: GetPersonByIdHandler,
    deps: [PersonReadRepository],
  },
  {
    handler: GetPersonByEmailHandler,
    deps: [PersonReadRepository],
  },
  // Document
  {
    handler: GetDocumentsHandler,
    deps: [DocumentReadRepository],
  },
  {
    handler: GetDocumentByIdHandler,
    deps: [DocumentReadRepository],
  },
  // Address
  {
    handler: GetAddressesHandler,
    deps: [AddressReadRepository],
  },
  {
    handler: GetAddressByIdHandler,
    deps: [AddressReadRepository],
  },
  // DocumentType
  {
    handler: GetDocumentTypesHandler,
    deps: [DocumentTypeReadRepository],
  },
  {
    handler: GetDocumentTypeByIdHandler,
    deps: [DocumentTypeReadRepository],
  },
];

export const queryAdapters = [
  GetPeopleQueryAdapter,
  GetPersonByIdQueryAdapter,
  GetPersonByEmailQueryAdapter,
  GetDocumentsQueryAdapter,
  GetDocumentByIdQueryAdapter,
  GetAddressesQueryAdapter,
  GetAddressByIdQueryAdapter,
  GetDocumentTypesQueryAdapter,
  GetDocumentTypeByIdQueryAdapter,
];

export const queryHandlerProviders = applicationHandlers.map((ah) => {
  return registerCqrsHandler(ah.handler, ah.deps);
});
