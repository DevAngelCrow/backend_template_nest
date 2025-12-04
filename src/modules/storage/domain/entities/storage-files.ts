import { StorageFilesActive } from '../value-objects/storage-files-value-object/storage-files-active';
import { StorageFilesContentFile } from '../value-objects/storage-files-value-object/storage-files-content-file';
import { StorageFilesFileName } from '../value-objects/storage-files-value-object/storage-files-file-name';
import { StorageFilesId } from '../value-objects/storage-files-value-object/storage-files-id';
import { StorageFilesIdProvider } from '../value-objects/storage-files-value-object/storage-files-id-provider';
import { StorageFilesIdUser } from '../value-objects/storage-files-value-object/storage-files-id-user';
import { StorageFilesMimeType } from '../value-objects/storage-files-value-object/storage-files-mime-type';
import { StorageFilesPath } from '../value-objects/storage-files-value-object/storage-files-path';
import { StorageFilesSize } from '../value-objects/storage-files-value-object/storage-files-size';

export class StorageFiles<T> {
  constructor(
    private readonly filename: StorageFilesFileName,
    private readonly id_provider: StorageFilesIdProvider,
    private readonly size: StorageFilesSize,
    private readonly mime_type: StorageFilesMimeType,
    private readonly active: StorageFilesActive,
    private readonly content_file: StorageFilesContentFile<T>,
    private readonly path: StorageFilesPath,
    private readonly id_user: StorageFilesIdUser,
    private readonly id?: StorageFilesId,
  ) {}
  static create<U>(data: {
    id?: number;
    filename: string;
    id_provider: number;
    size: number;
    mime_type: string;
    active: boolean;
    content_file: U;
    path: string;
    id_user: number;
  }) {
    return new StorageFiles(
      new StorageFilesFileName(data.filename),
      new StorageFilesIdProvider(data.id_provider),
      new StorageFilesSize(data.size),
      new StorageFilesMimeType(data.mime_type),
      new StorageFilesActive(data.active),
      new StorageFilesContentFile(data.content_file),
      new StorageFilesPath(data.path),
      new StorageFilesIdUser(data.id_user),
      data.id ? new StorageFilesId(data.id) : undefined,
    );
  }
  getId(): StorageFilesId | undefined {
    return this.id;
  }
  getFilename(): StorageFilesFileName {
    return this.filename;
  }
  getIdProvider(): StorageFilesIdProvider {
    return this.id_provider;
  }
  getSize(): StorageFilesSize {
    return this.size;
  }
  getMimeType(): StorageFilesMimeType {
    return this.mime_type;
  }
  getActive(): StorageFilesActive {
    return this.active;
  }
  getContentFile(): StorageFilesContentFile<T> {
    return this.content_file;
  }
  getPath(): StorageFilesPath {
    return this.path;
  }
  getIdUser(): StorageFilesIdUser {
    return this.id_user;
  }
}
