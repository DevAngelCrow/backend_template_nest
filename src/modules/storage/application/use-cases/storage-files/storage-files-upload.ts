import { StorageFilesRepository } from '@/modules/storage/domain/repositories/storage-files.repository';
import { StorageFilesContentFile } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-content-file';
//import { StorageFiles } from '@/modules/storage/domain/entities/storage-files';
import { StorageFilesPath } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-path';

export class StorageFilesUpload<T> {
  constructor(
    private readonly storageFilesRepository: StorageFilesRepository,
  ) {}
  public async run(storage_file_content: T): Promise<{
    content_file: StorageFilesContentFile<T>;
    path: StorageFilesPath;
  }> {
    const storageFileUpload = new StorageFilesContentFile<T>(
      storage_file_content,
    );
    return await this.storageFilesRepository.upload<T>(storageFileUpload);
  }
}
