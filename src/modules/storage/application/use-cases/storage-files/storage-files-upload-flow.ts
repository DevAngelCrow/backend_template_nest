import { StorageFilesRepository } from '@/modules/storage/domain/repositories/storage-files.repository';
import { StorageFilesContentFile } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-content-file';
import { StorageFiles } from '@/modules/storage/domain/entities/storage-files';
import { Injectable } from '@nestjs/common';
import { StorageFilesDto } from '../../dtos/storage-files.dto';
import { ProviderStorageCode } from '@/modules/storage/domain/value-objects/provider-storage-value-object/provider-storage-code';
import { ProviderStorageRepository } from '@/modules/storage/domain/repositories/provider-storage.repository';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { StorageFilesIdProvider } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-id-provider';
interface FileUpload {
  originalname: string;
  size: number;
  mimetype: string;
}
@Injectable()
export class StorageFilesUploadFlow<T extends FileUpload> {
  constructor(
    private readonly storageFilesRepository: StorageFilesRepository,
    private readonly providerStorageRepository: ProviderStorageRepository,
  ) {}
  public async run(
    storage_file_content: T,
    provider_storage_code: string,
  ): Promise<StorageFiles<T>> {
    const storageFileUpload = new StorageFilesContentFile<T>(
      storage_file_content,
    );

    const providerStorage = await this.providerStorageRepository.getOneByCode(
      new ProviderStorageCode(provider_storage_code),
    );
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', provider_storage_code);
    }
    const providerId = providerStorage.getId();
    if (!providerId?.value()) {
      throw new Error(`ProviderStorage id is undefined`);
    }
    const idProviderStorage = new StorageFilesIdProvider(providerId.value());
    const storageContentFile =
      await this.storageFilesRepository.upload<T>(storageFileUpload);
    const storageFileDto = new StorageFilesDto<T>(
      storageContentFile.content_file.value().originalname,
      idProviderStorage.value(),
      storageContentFile.content_file.value().size,
      storageContentFile.content_file.value().mimetype,
      true,
      storage_file_content,
      storageContentFile.path.value(),
    );
    const storageFileEntity = StorageFiles.create<T>({ ...storageFileDto });
    return await this.storageFilesRepository.create<T>(storageFileEntity);
  }
}
