import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/validators/user/create-user.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { UserCreate } from '@/modules/identity-access-management/application/use-cases/user/user-create';
import { UserGetOneByUserName } from '@/modules/identity-access-management/application/use-cases/user/user-get-one-by-user-name';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { UserHttpDto } from '../dtos/http/user-http.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userGetByUserName: UserGetOneByUserName,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() userCreateRequest: CreateUserDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.userCreate.run(userCreateRequest);
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
