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
import { CreateMaritalStatusDto } from '../dtos/validators/marital-status/create-marital-status.dto';
import { UpdateMaritalStatusDto } from '../dtos/validators/marital-status/update-marital-status.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMaritalStatusCommand } from '../../application/marital-status/commands/create-marital-status/create-marital-status.command';
import { UpdateMaritalStatusCommand } from '../../application/marital-status/commands/update-marital-status/update-marital-status.command';
import { DeleteMaritalStatusCommand } from '../../application/marital-status/commands/delete-marital-status/delete-marital-status.command';
import { GetMaritalStatusesQuery } from '../../application/marital-status/queries/get-marital-statuses/get-marital-statuses.query';
import { GetMaritalStatusQuery } from '../../application/marital-status/queries/get-marital-status/get-marital-status.query';
import { MaritalStatus } from '../../domain/entities/marital-status';

type MaritalStatusGetAllResponse =
  | HttpPaginatedResponseDto<MaritalStatusHttpDto>
  | MaritalStatusHttpDto[];
@Controller('marital-statuses')
@ApiBearerAuth('JWT-auth')
export class MaritalStatusController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() maritalStatusCreateRequest: CreateMaritalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateMaritalStatusCommand(maritalStatusCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'MaritalStatus created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() maritalStatusUpdateRequest: UpdateMaritalStatusDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateMaritalStatusCommand({
      ...maritalStatusUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'MaritalStatus updated successfully',
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
  ): Promise<SuccessResponseDto<MaritalStatusGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetMaritalStatusesQuery(paginationParams, filter);

      const maritalStatusesPagination = await this.queryBus.execute(query);

      if (maritalStatusesPagination instanceof Pagination) {
        const maritalStatusesHttpDto = maritalStatusesPagination
          .getEntityList()
          .map((maritalStatus: MaritalStatus) =>
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

    const query = new GetMaritalStatusesQuery();
    const maritalStatuses = await this.queryBus.execute(query);

    const maritalStatusesHttpDto = Array.isArray(maritalStatuses)
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
  @ApiParam({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<MaritalStatusHttpDto>> {
    const query = new GetMaritalStatusQuery(id);
    const maritalStatus = await this.queryBus.execute(query);
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
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteMaritalStatusCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'MaritalStatus deleted successfully',
    );
  }
}
