import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Register } from '../../application/use-cases/auth/register';
import { RegisterValidatorDto } from '../dtos/validators/auth/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { Transactional } from '@/shared/infrastructure/decorators/transactional.decorator';
import { LoginDto } from '../dtos/validators/auth/login.dto';
import { AuthLoginHttpDto } from '../dtos/http/user-http-dto/auth-login-http.dto';
import { Login } from '../../application/use-cases/auth/login';
import { SkipAuth } from '../decorators/public-route.decorator';
import { VerifyEmail } from '../../application/use-cases/email/verify-email';
type FileUpload = Express.Multer.File;

@Controller('/')
export class AuthController {
  constructor(
    private readonly register: Register<FileUpload>,
    private readonly loginUseCase: Login,
    private readonly verifyEmailUseCase: VerifyEmail,
  ) {}
  @SkipAuth()
  @Post('sign-up')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file_img'))
  @Transactional()
  async create(
    @Body() request: RegisterValidatorDto,
    @UploadedFile() file_img: FileUpload,
  ): Promise<SuccessResponseDto<null>> {
    console.log('Register request in the controller:', request);
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
  @SkipAuth()
  @Post('login')
  @HttpCode(200)
  @Transactional()
  async login(
    @Body() request: LoginDto,
  ): Promise<SuccessResponseDto<AuthLoginHttpDto>> {
    const authLogin = await this.loginUseCase.run(
      request.user_name,
      request.password,
    );
    const authLoginHttpDto = new AuthLoginHttpDto(
      authLogin.user_name,
      authLogin.id,
      authLogin.token,
    );
    return new SuccessResponseDto<AuthLoginHttpDto>(
      authLoginHttpDto,
      HttpStatus.OK,
      'Successfully logged in',
    );
  }
  @SkipAuth()
  @Get('verify-email')
  async verifyEmail(
    @Query('token') token: string,
  ): Promise<SuccessResponseDto<null>> {
    await this.verifyEmailUseCase.run(token);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Email verified successfully',
    );
  }
}
