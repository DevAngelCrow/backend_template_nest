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
import { MunicipalityHttpDto } from '../dtos/http/municipality-http-dto/municipality-http.dto';
import { CreateMunicipalityDto } from '../dtos/validators/municipality/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dtos/validators/municipality/update-municipality.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateMunicipalityCommand } from '../../application/municipality/commands/create-municipality/create-municipality.command';
import { UpdateMunicipalityCommand } from '../../application/municipality/commands/update-municipality/update-municipality.command';
import { DeleteMunicipalityCommand } from '../../application/municipality/commands/delete-municipality/delete-municipality.command';
import { GetMunicipalitiesQuery } from '../../application/municipality/queries/get-municipalities/get-municipalities.query';
import { GetMunicipalityQuery } from '../../application/municipality/queries/get-municipality/get-municipality.query';
import { Municipality } from '../../domain/entities/municipality';

type MunicipalityGetAllResponse =
  | HttpPaginatedResponseDto<MunicipalityHttpDto>
  | MunicipalityHttpDto[];
@Controller('municipalities')
@ApiBearerAuth('JWT-auth')
export class MunicipalityController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() municipalityCreateRequest: CreateMunicipalityDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateMunicipalityCommand(municipalityCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Municipality created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() municipalityUpdateRequest: UpdateMunicipalityDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateMunicipalityCommand({
      ...municipalityUpdateRequest,
      id,
    });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Municipality updated successfully',
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
  ): Promise<SuccessResponseDto<MunicipalityGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetMunicipalitiesQuery(paginationParams, filter);

      const municipalitiesPagination = await this.queryBus.execute(query);

      if (municipalitiesPagination instanceof Pagination) {
        const municipalitiesHttpDto = municipalitiesPagination
          .getEntityList()
          .map((municipality: Municipality) =>
            MunicipalityHttpDto.fromEntity(municipality),
          );
        const paginatedMunicipalitiesResponse =
          new HttpPaginatedResponseDto<MunicipalityHttpDto>(
            municipalitiesHttpDto,
            municipalitiesPagination.getTotalItems(),
            municipalitiesPagination.getTotalPages(),
            municipalitiesPagination.getPage(),
            municipalitiesPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<MunicipalityHttpDto>
        >(
          paginatedMunicipalitiesResponse,
          HttpStatus.OK,
          'Municipalities retrieved successfully',
        );
      }
    }

    const query = new GetMunicipalitiesQuery();
    const municipalities = await this.queryBus.execute(query);

    const municipalitiesHttpDto = Array.isArray(municipalities)
      ? municipalities.map((municipality) =>
          MunicipalityHttpDto.fromEntity(municipality),
        )
      : [];
    return new SuccessResponseDto<MunicipalityHttpDto[]>(
      municipalitiesHttpDto,
      HttpStatus.OK,
      'Municipalities retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<MunicipalityHttpDto>> {
    const query = new GetMunicipalityQuery(id);
    const municipality = await this.queryBus.execute(query);
    if (!municipality) {
      throw new NotFoundException('Municipality', id.toString());
    }
    const municipalityDtoHttp = MunicipalityHttpDto.fromEntity(municipality);
    return new SuccessResponseDto<MunicipalityHttpDto>(
      municipalityDtoHttp,
      HttpStatus.OK,
      'Municipality retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteMunicipalityCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Municipality deleted successfully',
    );
  }
}
