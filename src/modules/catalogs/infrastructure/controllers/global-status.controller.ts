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

import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { GlobalStatusHttpDto } from '../dtos/http/global-status-http-dto/global-status-http.dto';
import { CreateGlobalStatusDto } from '../dtos/validators/global-status/create-global-status.dto';
import { UpdateGlobalStatusDto } from '../dtos/validators/global-status/update-global-status.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateGlobalStatusCommand } from '../../application/global-status/commands/create-global-status/create-global-status.command';
import { UpdateGlobalStatusCommand } from '../../application/global-status/commands/update-global-status/update-global-status.command';
import { DeleteGlobalStatusCommand } from '../../application/global-status/commands/delete-global-status/delete-global-status.command';
import { GetGlobalStatusesQuery } from '../../application/global-status/queries/get-global-statuses/get-global-statuses.query';
import { GetGlobalStatusQuery } from '../../application/global-status/queries/get-global-status/get-global-status.query';
import { GlobalStatus } from '../../domain/entities/global-status';

type GlobalStatusGetAllResponse =
  | HttpPaginatedResponseDto<GlobalStatusHttpDto>
  | GlobalStatusHttpDto[];
@Controller('global-statuses')
@ApiBearerAuth('JWT-auth')
export class GlobalStatusController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() globalStatusCreateRequest: CreateGlobalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateGlobalStatusCommand(globalStatusCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'GlobalStatus created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() globalStatusUpdateRequest: UpdateGlobalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateGlobalStatusCommand({
      ...globalStatusUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'GlobalStatus updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'per_page', required: false, type: Number })
  @ApiQuery({ name: 'filter', required: false, type: String })
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<GlobalStatusGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetGlobalStatusesQuery(paginationParams, filter);

      const globalStatusesPagination = await this.queryBus.execute(query);

      if (globalStatusesPagination instanceof Pagination) {
        const globalStatusesHttpDto = globalStatusesPagination
          .getEntityList()
          .map((globalStatus: GlobalStatus) =>
            GlobalStatusHttpDto.fromEntity(globalStatus),
          );
        const paginatedGlobalStatusesResponse =
          new HttpPaginatedResponseDto<GlobalStatusHttpDto>(
            globalStatusesHttpDto,
            globalStatusesPagination.getTotalItems(),
            globalStatusesPagination.getTotalPages(),
            globalStatusesPagination.getPage(),
            globalStatusesPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<GlobalStatusHttpDto>
        >(
          paginatedGlobalStatusesResponse,
          HttpStatus.OK,
          'GlobalStatuses retrieved successfully',
        );
      }
    }

    const query = new GetGlobalStatusesQuery();
    const globalStatuses = await this.queryBus.execute(query);

    const globalStatusesHttpDto = Array.isArray(globalStatuses)
      ? globalStatuses.map((globalStatus) =>
          GlobalStatusHttpDto.fromEntity(globalStatus),
        )
      : [];
    return new SuccessResponseDto<GlobalStatusHttpDto[]>(
      globalStatusesHttpDto,
      HttpStatus.OK,
      'GlobalStatuses retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<GlobalStatusHttpDto>> {
    const query = new GetGlobalStatusQuery(id);
    const globalStatus = await this.queryBus.execute(query);
    if (!globalStatus) {
      throw new NotFoundException('GlobalStatus', id.toString());
    }
    const globalStatusDtoHttp = GlobalStatusHttpDto.fromEntity(globalStatus);
    return new SuccessResponseDto<GlobalStatusHttpDto>(
      globalStatusDtoHttp,
      HttpStatus.OK,
      'GlobalStatus retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteGlobalStatusCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'GlobalStatus deleted successfully',
    );
  }
}
