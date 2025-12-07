import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Register } from '../../application/use-cases/auth/register';
import { RegisterValidatorDto } from '../dtos/validators/auth/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';
import { RegisterDto } from '../../application/use-cases/dtos/register.dto';
type FileUpload = Express.Multer.File;

@Controller('/')
export class AuthController {
  constructor(private readonly register: Register<FileUpload>) {}
  @Post('sign-up')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file_img'))
  async create(
    @Body() request: RegisterValidatorDto,
    @UploadedFile() file_img: FileUpload,
  ): Promise<SuccessResponseDto<null>> {
    const registerDto = new RegisterDto<FileUpload>(
      request.first_name,
      request.middle_name,
      request.last_name,
      request.birthdate,
      request.email,
      request.id_gender,
      request.id_marital_status,
      request.phone,
      1 /*id_status*/,
      request.nationalities,
      file_img,
      undefined,
      //User data
      request.user_name,
      request.password,
      1 /*id status user*/,
      new Date() /*last access*/,
      false,
      undefined,
      //Address data
      request.street,
      request.street_number,
      request.neighborhood,
      request.id_district,
      request.house_number,
      request.block,
      request.pathway,
      true,
      undefined,
      true,
      //Document data
      request.id_type_document,
      request.description ?? '',
      request.document_number,
      true,
      undefined,
    );
    await this.register.run(registerDto, process.env.PROVIDER_STORAGE_CODE!);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'User created successfully',
    );
  }
}
