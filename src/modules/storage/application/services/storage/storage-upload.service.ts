import { StorageFiles } from '@/modules/storage/domain/entities/storage-files';
import { StorageFilesUploadFlow } from '../../use-cases/storage-files/storage-files-upload-flow';

interface FileUpload {
  originalname: string;
  size: number;
  mimetype: string;
}
export class StorageUploadService<T extends FileUpload> {
  constructor(private readonly storageUpload: StorageFilesUploadFlow<T>) {}
  async run(
    storage_file_content: T,
    provider_storage_code: string,
  ): Promise<StorageFiles<T>> {
    return await this.storageUpload.run(
      storage_file_content,
      provider_storage_code,
    );
  }
}
