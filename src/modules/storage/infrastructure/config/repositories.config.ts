import { APP_GUARD } from '@nestjs/core';
import { ProviderStorageRepository } from '../../domain/repositories/provider-storage.repository';
import { StorageFilesRepository } from '../../domain/repositories/storage-files.repository';
import { ImplProviderStorageRepository } from '../implementation/impl-provider-storage.repository';
import { ImplStorageFilesRepository } from '../implementation/impl-storage-files.repository';
import { JwtPassportAuthGuard } from '@/modules/auth/infrastructure/guards/jwt-passport-auth.guard';

export const repositories = [
  {
    provide: ProviderStorageRepository,
    useClass: ImplProviderStorageRepository,
  },
  {
    provide: StorageFilesRepository,
    useClass: ImplStorageFilesRepository,
  },
  { provide: APP_GUARD, useClass: JwtPassportAuthGuard },
];
