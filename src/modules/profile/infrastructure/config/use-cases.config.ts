import { Abstract, Type } from '@nestjs/common';
import { PersonCreate } from '../../application/use-cases/person/person-create';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { PersonGetAll } from '../../application/use-cases/person/person-get-all';
import { PersonGetOneByEmail } from '../../application/use-cases/person/person-get-one-by-email';
import { PersonGetOneById } from '../../application/use-cases/person/person-get-one-by-id';
import { DocumentTypeCreate } from '../../application/use-cases/document-type/document-type-create';
import { DocumentTypeRepository } from '../../domain/repositories/document-type.repository';
import { DocumentTypeUpdate } from '../../application/use-cases/document-type/document-type-update';
import { DocumentTypeGetAll } from '../../application/use-cases/document-type/document-type-get-all';
import { DocumentTypeGetOneById } from '../../application/use-cases/document-type/document-type-get-one-by-id';
import { DocumentTypeDelete } from '../../application/use-cases/document-type/document-type-delete';
import { DocumentCreate } from '../../application/use-cases/document/document-create';
import { DocumentRepository } from '../../domain/repositories/document.repository';
import { DocumentUpdate } from '../../application/use-cases/document/document-update';
import { DocumentGetAll } from '../../application/use-cases/document/document-get-all';
import { DocumentGetOneById } from '../../application/use-cases/document/document-get-one-by-id';
import { DocumentDelete } from '../../application/use-cases/document/document-delete';
import { AddressCreate } from '../../application/use-cases/address/address-create';
import { AddressRepository } from '../../domain/repositories/address.repository';
import { AddressUpdate } from '../../application/use-cases/address/address-update';
import { AddressGetAll } from '../../application/use-cases/address/address-get-all';
import { AddressGetOneById } from '../../application/use-cases/address/address-get-one-by-id';
import { AddressDelete } from '../../application/use-cases/address/address-delete';
import { registerUseCase } from '@/shared/infrastructure/factories/register-use-case.factory';
import PersonUpdate from '../../application/use-cases/person/person-update';

export const useCases: Array<{
  useCase: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    useCase: PersonCreate,
    deps: [PersonRepository],
  },
  {
    useCase: PersonUpdate,
    deps: [PersonRepository],
  },
  {
    useCase: PersonGetAll,
    deps: [PersonRepository],
  },
  {
    useCase: PersonGetOneByEmail,
    deps: [PersonRepository],
  },
  {
    useCase: PersonGetOneById,
    deps: [PersonRepository],
  },
  {
    useCase: DocumentTypeCreate,
    deps: [DocumentTypeRepository],
  },
  {
    useCase: DocumentTypeUpdate,
    deps: [DocumentTypeRepository],
  },
  {
    useCase: DocumentTypeGetAll,
    deps: [DocumentTypeRepository],
  },
  {
    useCase: DocumentTypeGetOneById,
    deps: [DocumentTypeRepository],
  },
  {
    useCase: DocumentTypeDelete,
    deps: [DocumentTypeRepository],
  },
  {
    useCase: DocumentCreate,
    deps: [DocumentRepository],
  },
  {
    useCase: DocumentUpdate,
    deps: [DocumentRepository],
  },
  {
    useCase: DocumentGetAll,
    deps: [DocumentRepository],
  },
  {
    useCase: DocumentGetOneById,
    deps: [DocumentRepository],
  },
  {
    useCase: DocumentDelete,
    deps: [DocumentRepository],
  },
  {
    useCase: AddressCreate,
    deps: [AddressRepository],
  },
  {
    useCase: AddressUpdate,
    deps: [AddressRepository],
  },
  {
    useCase: AddressGetAll,
    deps: [AddressRepository],
  },
  {
    useCase: AddressGetOneById,
    deps: [AddressRepository],
  },
  {
    useCase: AddressDelete,
    deps: [AddressRepository],
  },
];

export const useCasesProviders = useCases.map((uc) => {
  return registerUseCase(uc.useCase, uc.deps);
});
