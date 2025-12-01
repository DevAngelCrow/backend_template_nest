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
import { MunicipalityHttpDto } from '../dtos/http/municipality-http-dto/municipality-http.dto';
import { MunicipalityCreate } from '../../application/use-cases/municipality/municipality-create';
import { MunicipalityUpdate } from '../../application/use-cases/municipality/municipality-update';
import { MunicipalityGetAll } from '../../application/use-cases/municipality/municipality-get-all';
import { MunicipalityGetOneById } from '../../application/use-cases/municipality/municipality-get-one-by-id';
import { MunicipalityDelete } from '../../application/use-cases/municipality/municipality-delete';
import { CreateMunicipalityDto } from '../dtos/validators/municipality/create-municipality.dto';
import { UpdateMunicipalityDto } from '../dtos/validators/municipality/update-municipality.dto';

type MunicipalityGetAllResponse =
  | HttpPaginatedResponseDto<MunicipalityHttpDto>
  | MunicipalityHttpDto[];
@Controller('municipalities')
export class MunicipalityController {
  constructor(
    private readonly municipalityCreate: MunicipalityCreate,
    private readonly municipalityUpdate: MunicipalityUpdate,
    private readonly municipalityGetAll: MunicipalityGetAll,
    private readonly municipalityGetOneById: MunicipalityGetOneById,
    private readonly municipalityDelete: MunicipalityDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() municipalityCreateRequest: CreateMunicipalityDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.municipalityCreate.run(municipalityCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Municipality created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() municipalityUpdateRequest: UpdateMunicipalityDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.municipalityUpdate.run({ ...municipalityUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Municipality updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<MunicipalityGetAllResponse>> {
    const { municipalities, total } = await this.municipalityGetAll.run(
      page,
      per_page,
      filter,
    );
    const municipalityDtoHttp = municipalities.map((municipality) =>
      MunicipalityHttpDto.fromEntity(municipality),
    );
    if (page !== undefined && per_page !== undefined) {
      const total_page = Math.ceil(total / per_page);

      const paginatedResponse = new HttpPaginatedResponseDto(
        municipalityDtoHttp,
        total,
        total_page,
        page,
        per_page,
      );

      return new SuccessResponseDto(
        paginatedResponse,
        HttpStatus.OK,
        'Municipalities retrieved successfully',
      );
    }
    return new SuccessResponseDto(
      municipalityDtoHttp,
      HttpStatus.OK,
      'Municipalities retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<MunicipalityHttpDto>> {
    const municipality = await this.municipalityGetOneById.run(id);
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
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.municipalityDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Municipality deleted successfully',
    );
  }
}
