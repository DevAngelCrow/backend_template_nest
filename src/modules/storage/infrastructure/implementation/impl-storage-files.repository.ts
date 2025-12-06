import { join } from 'path';
import { StorageFiles } from '../../domain/entities/storage-files';
import { StorageFilesRepository } from '../../domain/repositories/storage-files.repository';
import { StorageFilesContentFile } from '../../domain/value-objects/storage-files-value-object/storage-files-content-file';
//import { StorageFilesId } from '../../domain/value-objects/storage-files-value-object/storage-files-id';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { StorageFilesPath } from '../../domain/value-objects/storage-files-value-object/storage-files-path';

@Injectable()
export class ImplStorageFilesRepository implements StorageFilesRepository {
  private diskPath = join(process.cwd(), 'storage');
  private basePath = 'profile_img';
  constructor(private readonly prisma: PrismaService) {}
  async upload<T>(storage_file_content: StorageFilesContentFile<T>): Promise<{
    content_file: StorageFilesContentFile<T>;
    path: StorageFilesPath;
  }> {
    try {
      const file = storage_file_content.value() as Express.Multer.File;
      const filename = randomUUID() + '.' + file?.originalname.split('.').pop();

      const folder = join(this.diskPath, this.basePath);
      await mkdir(folder, { recursive: true });

      const fullPath = join(folder, filename);
      await writeFile(fullPath, file.buffer);

      return {
        content_file: storage_file_content,
        path: new StorageFilesPath(fullPath),
      };
    } catch (error) {
      throw new Error('Error uploading file: ' + String(error));
    }
  }
  async create<T>(storage_file: StorageFiles<T>): Promise<StorageFiles<T>> {
    try {
      const storageFileCreatePrisma =
        await this.prisma.mnt_storage_files.create({
          data: {
            filename: storage_file.getFilename().value(),
            size: storage_file.getSize().value(),
            mime_type: storage_file.getMimeType().value(),
            active: storage_file.getActive().value(),
            id_provider: storage_file.getIdProvider().value(),
            path: storage_file.getPath().value(),
          },
        });
      const storageFileCreate = StorageFiles.create<T>({
        filename: storageFileCreatePrisma.filename,
        id_provider: Number(storageFileCreatePrisma.id_provider),
        size: Number(storageFileCreatePrisma.size),
        mime_type: storageFileCreatePrisma.mime_type,
        active: storageFileCreatePrisma.active,
        content_file: storage_file.getContentFile().value(),
        path: storageFileCreatePrisma.path,
        id: Number(storageFileCreatePrisma.id),
      });
      return storageFileCreate;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating storage file: ${error.message}`);
      }
      throw new DatabaseException('Error creating storage file', 'create');
    }
  }
  //   download<T>(id: StorageFilesId): Promise<StorageFiles<T>> {
  //     throw new Error('Method not implemented.');
  //   }
  //   getDataStorageFile<T>(id: StorageFilesId): Promise<StorageFiles<T>> {
  //     throw new Error('Method not implemented.');
  //   }
  //   delete(id: StorageFilesId): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }
}
