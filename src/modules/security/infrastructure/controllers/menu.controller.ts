import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Menu, Permission } from '../interfaces/menu.interface';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';
import { GetMenuUser } from '../../application/use-cases/menu/get-menu-user';
import { MenuHttpDto } from '../dtos/http/menu-http-dto/menu-http.dto';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';

@Controller('menus')
@ApiBearerAuth('JWT-auth')
export class MenuController {
  constructor(private readonly getMenu: GetMenuUser<Menu, Permission>) {}
  @UseGuards(PermissionsGuard)
  @Permissions('ver-menu-usuario')
  @Get()
  @HttpCode(200)
  async menu(
    @Req() request: Request<{ headers: { authorization: string } }>,
  ): Promise<SuccessResponseDto<MenuHttpDto<Menu, Permission>[]>> {
    const token = request.headers.authorization?.replace('Bearer ', '') || '';
    const menus = await this.getMenu.run(token);
    const menuDto = menus.map((menu) =>
      MenuHttpDto.fromEntity<Menu, Permission>(menu),
    );
    return new SuccessResponseDto<MenuHttpDto<Menu, Permission>[]>(
      menuDto,
      HttpStatus.OK,
      'Menu retrieved successfully',
    );
  }
}
