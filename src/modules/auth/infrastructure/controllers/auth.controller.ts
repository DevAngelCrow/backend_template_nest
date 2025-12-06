import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Register } from '../../application/use-cases/auth/register';
import { RegisterValidatorDto } from '../dtos/validators/auth/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';
type FileUpload = Express.Multer.File;

@Controller('/')
export class UserController {
  constructor(
    private readonly register: Register<FileUpload>
  ) {}
  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file_img'))
  async create(
    @Body() request: RegisterValidatorDto,
    @UploadedFile('file_img') file_img: Express.Multer.File,
  ): Promise<SuccessResponseDto<null>> {
    await this.register.run({...request, file_img}, process.env.PROVIDER_STORAGE_CODE!);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'User created successfully',
    );
  }
  @Get('user-name/:user_name')
  @HttpCode(200)
  async getByUserName(
    @Param('user_name') user_name: string,
  ): Promise<SuccessResponseDto<UserHttpDto>> {
    const user = await this.userGetByUserName.run(user_name);
    if (!user) {
      throw new NotFoundException('User', user_name.toString());
    }
    const userHttpDto = UserHttpDto.fromEntity(user);
    return new SuccessResponseDto<UserHttpDto>(
      userHttpDto,
      HttpStatus.OK,
      `User with user_name ${user_name} retrieved successfully`,
    );
  }
}
