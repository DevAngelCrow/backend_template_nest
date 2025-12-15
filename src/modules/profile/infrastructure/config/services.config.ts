import { Abstract, Type } from '@nestjs/common';
import { AddressCreateService } from '../../application/services/address/address-create.service';
import { DocumentCreateService } from '../../application/services/document/document-create.service';
import { DocumentCreate } from '../../application/use-cases/document/document-create';
import { AddressCreate } from '../../application/use-cases/address/address-create';
import { PersonCreateService } from '../../application/services/person/person-create.service';
import { PersonCreate } from '../../application/use-cases/person/person-create';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';
import { PersonGetOneByEmailService } from '../../application/services/person/person-get-one-by-email.service';
import { PersonGetOneByEmail } from '../../application/use-cases/person/person-get-one-by-email';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: AddressCreateService,
    deps: [AddressCreate],
  },
  {
    service: DocumentCreateService,
    deps: [DocumentCreate],
  },
  {
    service: PersonCreateService,
    deps: [PersonCreate],
  },
  {
    service: PersonGetOneByEmailService,
    deps: [PersonGetOneByEmail],
  },
];

export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
