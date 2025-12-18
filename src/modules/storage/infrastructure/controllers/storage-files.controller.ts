import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { StorageFilesUploadFlow } from '../../application/use-cases/storage-files/storage-files-upload-flow';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
type FileType = Express.Multer.File;
@Controller('storage-files')
@ApiBearerAuth('JWT-auth')
export class StorageFilesController {
  constructor(
    private readonly storageFileUploadFlow: StorageFilesUploadFlow<FileType>,
  ) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('content_file'))
  async upload(
    @UploadedFile() content_file: FileType,
  ): Promise<SuccessResponseDto<null>> {
    const file: FileType = content_file;
    await this.storageFileUploadFlow.run(
      file,
      process.env.PROVIDER_STORAGE_CODE!,
    );
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'StorageFile created successfully',
    );
  }
}
