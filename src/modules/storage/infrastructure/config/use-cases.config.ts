import { Abstract, Type } from '@nestjs/common';
import { ProviderStorageCreate } from '../../application/use-cases/provider-storage/provider-storage-create';
import { ProviderStorageGetAll } from '../../application/use-cases/provider-storage/provider-storage-get-all';
import { ProviderStorageGetOneByCode } from '../../application/use-cases/provider-storage/provider-storage-get-one-by-code';
import { ProviderStorageGetOneById } from '../../application/use-cases/provider-storage/provider-storage-get-one-by-id';
import { ProviderStorageUpdate } from '../../application/use-cases/provider-storage/provider-storage-update';
import { StorageFilesUploadFlow } from '../../application/use-cases/storage-files/storage-files-upload-flow';
import { ProviderStorageRepository } from '../../domain/repositories/provider-storage.repository';
import { StorageFilesRepository } from '../../domain/repositories/storage-files.repository';
import { registerUseCase } from '@/shared/infrastructure/factories/register-use-case.factory';
import { StorageFilesUpload } from '../../application/use-cases/storage-files/storage-files-upload';
import { StorageFilesCreate } from '../../application/use-cases/storage-files/storage-files-create';
import { ProviderStorageDelete } from '../../application/use-cases/provider-storage/provider-storage-delete';

export const useCases: Array<{
  useCase: Type<unknown>;
  deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
  {
    useCase: StorageFilesUploadFlow,
    deps: [StorageFilesRepository, ProviderStorageRepository],
  },
  {
    useCase: StorageFilesUpload,
    deps: [StorageFilesRepository],
  },
  {
    useCase: StorageFilesCreate,
    deps: [StorageFilesRepository],
  },
  {
    useCase: ProviderStorageCreate,
    deps: [ProviderStorageRepository],
  },
  {
    useCase: ProviderStorageUpdate,
    deps: [ProviderStorageRepository],
  },
  {
    useCase: ProviderStorageGetAll,
    deps: [ProviderStorageRepository],
  },
  {
    useCase: ProviderStorageGetOneByCode,
    deps: [ProviderStorageRepository],
  },
  {
    useCase: ProviderStorageGetOneById,
    deps: [ProviderStorageRepository],
  },
  {
    useCase: ProviderStorageDelete,
    deps: [ProviderStorageRepository],
  },
];

export const useCaseProviders = useCases.map((uc) => {
  return registerUseCase(uc.useCase, uc.deps);
});
