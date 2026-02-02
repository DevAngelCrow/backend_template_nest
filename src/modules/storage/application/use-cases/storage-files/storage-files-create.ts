import { StorageFiles } from '@/modules/storage/domain/entities/storage-files';
import { StorageFilesRepository } from '@/modules/storage/domain/repositories/storage-files.repository';
import { StorageFilesDto } from '../../dtos/storage-files.dto';
import { StorageFilesContentFile } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-content-file';

export class StorageFilesCreate<T> {
  constructor(
    private readonly storageFilesRepository: StorageFilesRepository,
  ) {}
  public async run(
    storage_files_dto: StorageFilesDto<T>,
  ): Promise<StorageFiles<T>> {
    const pathFile = await this.storageFilesRepository.upload<T>(
      new StorageFilesContentFile<T>(storage_files_dto.content_file),
    );
    const storageFileCreate = StorageFiles.create<T>({
      filename: storage_files_dto.filename,
      id_provider: storage_files_dto.id_provider,
      size: storage_files_dto.size,
      mime_type: storage_files_dto.mime_type,
      active: storage_files_dto.active,
      content_file: storage_files_dto.content_file,
      path: pathFile.path.value(),
    });
    return await this.storageFilesRepository.create<T>(storageFileCreate);
  }
}
