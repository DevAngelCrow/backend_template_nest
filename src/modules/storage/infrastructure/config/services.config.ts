import { Abstract, Type } from '@nestjs/common';
import { StorageUploadService } from '../../application/services/storage/storage-upload.service';
import { StorageFilesUploadFlow } from '../../application/use-cases/storage-files/storage-files-upload-flow';
import { registerService } from '@/shared/infrastructure/factories/register-service.factory';

export const services: Array<{
  service: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    service: StorageUploadService,
    deps: [StorageFilesUploadFlow],
  },
];

export const serviceProviders = services.map((uc) => {
  return registerService(uc.service, uc.deps);
});
