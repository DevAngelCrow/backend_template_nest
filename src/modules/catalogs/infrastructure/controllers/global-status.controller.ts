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
import { GlobalStatusCreate } from '../../application/use-cases/global-status/global-status-create';
import { GlobalStatusUpdate } from '../../application/use-cases/global-status/global-status-update';
import { GlobalStatusGetAll } from '../../application/use-cases/global-status/global-status-get-all';
import { GlobalStatusGetOneById } from '../../application/use-cases/global-status/global-status-get-one-by-id';
import { GlobalStatusDelete } from '../../application/use-cases/global-status/global-status-delete';
import { CreateGlobalStatusDto } from '../dtos/validators/global-status/create-global-status.dto';
import { UpdateGlobalStatusDto } from '../dtos/validators/global-status/update-global-status.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

type GlobalStatusGetAllResponse =
  | HttpPaginatedResponseDto<GlobalStatusHttpDto>
  | GlobalStatusHttpDto[];
@Controller('global-statuses')
@ApiBearerAuth('JWT-auth')
export class GlobalStatusController {
  constructor(
    private readonly globalStatusCreate: GlobalStatusCreate,
    private readonly globalStatusUpdate: GlobalStatusUpdate,
    private readonly globalStatusGetAll: GlobalStatusGetAll,
    private readonly globalStatusGetOneById: GlobalStatusGetOneById,
    private readonly globalStatusDelete: GlobalStatusDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() globalStatusCreateRequest: CreateGlobalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.globalStatusCreate.run(globalStatusCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'GlobalStatus created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() globalStatusUpdateRequest: UpdateGlobalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.globalStatusUpdate.run({ ...globalStatusUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'GlobalStatus updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<GlobalStatusGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const globalStatusesPagination = await this.globalStatusGetAll.run(
        paginationParams,
        filter,
      );
      if (globalStatusesPagination instanceof Pagination) {
        const globalStatusesHttpDto = globalStatusesPagination
          .getEntityList()
          .map((globalStatus) => GlobalStatusHttpDto.fromEntity(globalStatus));
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

    const globalStatuses = await this.globalStatusGetAll.run(undefined, filter);

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
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<GlobalStatusHttpDto>> {
    const globalStatus = await this.globalStatusGetOneById.run(id);
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
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.globalStatusDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'GlobalStatus deleted successfully',
    );
  }
}
