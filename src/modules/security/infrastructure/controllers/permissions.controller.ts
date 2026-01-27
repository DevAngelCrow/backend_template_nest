import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PermissionsRequestDto } from '../dtos/validators/permissions/permissions.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { PermissionsHttpDto } from '../dtos/http/permissions-http-dto/permissions-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Permissions } from '../../domain/entities/permissions';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePermissionsCommand } from '../../application/permissions/commands/create-permissions/create-permissions.command';
import { UpdatePermissionsCommand } from '../../application/permissions/commands/update-permissions/update-permissions.command';
import { DeletePermissionsCommand } from '../../application/permissions/commands/delete-permissions/delete-permissions.command';
import { GetPermissionsQuery } from '../../application/permissions/queries/get-permissions/get-permissions.query';
import { GetPermissionsByIdQuery } from '../../application/permissions/queries/get-permissions-by-id/get-permissions-by-id.query';

type PermissionsGetAllResponse =
  | HttpPaginatedResponseDto<PermissionsHttpDto>
  | PermissionsHttpDto[];

@Controller('permissions')
@ApiBearerAuth('JWT-auth')
export class PermissionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() permissionsCreateRequest: PermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreatePermissionsCommand(permissionsCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Permissions created successfully',
    );
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() permissionsUpdateRequest: PermissionsRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdatePermissionsCommand({
      ...permissionsUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Permissions updated successfully',
    );
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<PermissionsGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetPermissionsQuery(paginationParams, filter);
      const permissionsPagination = await this.queryBus.execute(query);
      if (permissionsPagination instanceof Pagination) {
        const permissionsHttpDto = permissionsPagination
          .getEntityList()
          .map((permissions: Permissions) =>
            PermissionsHttpDto.fromEntity(permissions),
          );
        const paginatedPermissionsResponse =
          new HttpPaginatedResponseDto<PermissionsHttpDto>(
            permissionsHttpDto,
            permissionsPagination.getTotalItems(),
            permissionsPagination.getTotalPages(),
            permissionsPagination.getPage(),
            permissionsPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<PermissionsHttpDto>
        >(
          paginatedPermissionsResponse,
          HttpStatus.OK,
          'Permissions retrieved successfully',
        );
      }
    }

    const query = new GetPermissionsQuery(undefined, filter);
    const permissions = await this.queryBus.execute(query);

    const permissionsHttpDto = Array.isArray(permissions)
      ? permissions.map((permissions) =>
          PermissionsHttpDto.fromEntity(permissions),
        )
      : [];
    return new SuccessResponseDto<PermissionsHttpDto[]>(
      permissionsHttpDto,
      HttpStatus.OK,
      'Permissions retrieved successfully',
    );
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<PermissionsHttpDto>> {
    const query = new GetPermissionsByIdQuery(id);
    const permissions = await this.queryBus.execute(query);
    if (!permissions) {
      throw new NotFoundException('Permissions', id.toString());
    }
    const permissionsDtoHttp = PermissionsHttpDto.fromEntity(permissions);
    return new SuccessResponseDto<PermissionsHttpDto>(
      permissionsDtoHttp,
      HttpStatus.OK,
      'Permissions retrieved successfully',
    );
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeletePermissionsCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Permissions deleted successfully',
    );
  }
}
