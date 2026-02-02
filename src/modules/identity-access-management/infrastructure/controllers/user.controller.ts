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
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { UserHttpDto } from '../dtos/http/user-http.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/user/commands/create-user/create-user.command';
import { GetUserByUserNameQuery } from '../../application/user/queries/get-user-by-user-name/get-user-by-user-name.query';

@Controller('users')
@ApiBearerAuth('JWT-auth')
export class UserController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() userCreateRequest: CreateUserDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateUserCommand(userCreateRequest);
    await this.commandBus.execute(command);
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
    const query = new GetUserByUserNameQuery(user_name);
    const user = await this.queryBus.execute(query);
    if (!user) {
      throw new NotFoundException('User', user_name.toString());
    }
    const userHttpDto = UserHttpDto.fromEntity(user.user);
    return new SuccessResponseDto<UserHttpDto>(
      userHttpDto,
      HttpStatus.OK,
      `User with user_name ${user_name} retrieved successfully`,
    );
  }
}
