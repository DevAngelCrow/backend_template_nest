import { Abstract, Type } from '@nestjs/common';
import { TokenGeneratorService } from '../../application/services/token-generator.service';
import { TokenGeneratorPort } from '../../domain/ports/token-generator.port';
import { CredentialsValidationService } from '../../application/services/credentials-validation.service';
import { CredentialsValidationPort } from '../../domain/ports/credentials-validation.port';
import { FinduserService } from '../../../identity-access-management/application/services/find-user.service';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';
import { UserGetOneByUserName } from '@/modules/identity-access-management/application/use-cases/user/user-get-one-by-user-name';
import { DocumentCreateService } from '@/modules/profile/application/services/document/document-create.service';
import { DocumentCreate } from '@/modules/profile/application/use-cases/document/document-create';
import { StorageUploadService } from '@/modules/storage/application/services/storage/storage-upload.service';
import { StorageFilesUploadFlow } from '@/modules/storage/application/use-cases/storage-files/storage-files-upload-flow';
import { CreateUserService } from '@/modules/identity-access-management/application/services/create-user.service';
import { UserCreate } from '@/modules/identity-access-management/application/use-cases/user/user-create';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: TokenGeneratorService,
    deps: [TokenGeneratorPort],
  },
  {
    service: CredentialsValidationService,
    deps: [CredentialsValidationPort],
  },
  {
    service: FinduserService,
    deps: [UserGetOneByUserName],
  },
  {
    service: DocumentCreateService,
    deps: [DocumentCreate],
  },
  {
    service: StorageUploadService,
    deps: [StorageFilesUploadFlow],
  },
  {
    service: CreateUserService,
    deps: [UserCreate],
  },
];

export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
