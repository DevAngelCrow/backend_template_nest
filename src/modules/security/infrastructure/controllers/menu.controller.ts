import {
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { menu, permission } from '../interfaces/menu.interface';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';
import { GetMenuUser } from '../../application/use-cases/menu/get-menu-user';
import { MenuHttpDto } from '../dtos/http/menu-http-dto/menu-http.dto';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Permissions } from '../decorators/permissions.decorator';

@Controller('menus')
export class MenuController {
  constructor(private readonly getMenu: GetMenuUser<menu, permission>) {}
  @UseGuards(PermissionsGuard)
  @Permissions('ver-menu-usuario')
  @Get()
  @HttpCode(200)
  async menu(
    @Headers('authorization') token: string,
  ): Promise<SuccessResponseDto<MenuHttpDto<menu, permission>[]>> {
    const menus = await this.getMenu.run(token);
    const menuDto = menus.map((menu) =>
      MenuHttpDto.fromEntity<menu, permission>(menu),
    );
    return new SuccessResponseDto<MenuHttpDto<menu, permission>[]>(
      menuDto,
      HttpStatus.OK,
      'Menu retrieved successfully',
    );
  }
}
