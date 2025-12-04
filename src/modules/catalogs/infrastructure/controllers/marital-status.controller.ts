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
import { MaritalStatusHttpDto } from '../dtos/http/marital-status-http-dto/marital-status-http.dto';
import { MaritalStatusCreate } from '../../application/use-cases/marital-status/marital-status-create';
import { MaritalStatusUpdate } from '../../application/use-cases/marital-status/marital-status-update';
import { MaritalStatusGetAll } from '../../application/use-cases/marital-status/marital-status-get-all';
import { MaritalStatusGetOneById } from '../../application/use-cases/marital-status/marital-status-get-one-by-id';
import { MaritalStatusDelete } from '../../application/use-cases/marital-status/marital-status-delete';
import { CreateMaritalStatusDto } from '../dtos/validators/marital-status/create-marital-status.dto';
import { UpdateMaritalStatusDto } from '../dtos/validators/marital-status/update-marital-status.dto';

type MaritalStatusGetAllResponse =
  | HttpPaginatedResponseDto<MaritalStatusHttpDto>
  | MaritalStatusHttpDto[];
@Controller('marital-statuses')
export class MaritalStatusController {
  constructor(
    private readonly maritalStatusCreate: MaritalStatusCreate,
    private readonly maritalStatusUpdate: MaritalStatusUpdate,
    private readonly maritalStatusGetAll: MaritalStatusGetAll,
    private readonly maritalStatusGetOneById: MaritalStatusGetOneById,
    private readonly maritalStatusDelete: MaritalStatusDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() maritalStatusCreateRequest: CreateMaritalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.maritalStatusCreate.run(maritalStatusCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'MaritalStatus created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() maritalStatusUpdateRequest: UpdateMaritalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.maritalStatusUpdate.run({ ...maritalStatusUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'MaritalStatus updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<MaritalStatusGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const maritalStatusesPagination = await this.maritalStatusGetAll.run(
        paginationParams,
        filter,
      );
      if (maritalStatusesPagination instanceof Pagination) {
        const maritalStatusesHttpDto = maritalStatusesPagination
          .getEntityList()
          .map((maritalStatus) =>
            MaritalStatusHttpDto.fromEntity(maritalStatus),
          );
        const paginatedMaritalStatusesResponse =
          new HttpPaginatedResponseDto<MaritalStatusHttpDto>(
            maritalStatusesHttpDto,
            maritalStatusesPagination.getTotalItems(),
            maritalStatusesPagination.getTotalPages(),
            maritalStatusesPagination.getPage(),
            maritalStatusesPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<MaritalStatusHttpDto>
        >(
          paginatedMaritalStatusesResponse,
          HttpStatus.OK,
          'MaritalStatuses retrieved successfully',
        );
      }
    }

    const maritalStatuses = await this.maritalStatusGetAll.run(
      undefined,
      filter,
    );

    const maritalStatusesHttpDto =
      maritalStatuses instanceof Array
        ? maritalStatuses.map((maritalStatus) =>
            MaritalStatusHttpDto.fromEntity(maritalStatus),
          )
        : [];
    return new SuccessResponseDto<MaritalStatusHttpDto[]>(
      maritalStatusesHttpDto,
      HttpStatus.OK,
      'MaritalStatuses retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<MaritalStatusHttpDto>> {
    const maritalStatus = await this.maritalStatusGetOneById.run(id);
    if (!maritalStatus) {
      throw new NotFoundException('MaritalStatus', id.toString());
    }
    const maritalStatusDtoHttp = MaritalStatusHttpDto.fromEntity(maritalStatus);
    return new SuccessResponseDto<MaritalStatusHttpDto>(
      maritalStatusDtoHttp,
      HttpStatus.OK,
      'MaritalStatus retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.maritalStatusDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'MaritalStatus deleted successfully',
    );
  }
}
