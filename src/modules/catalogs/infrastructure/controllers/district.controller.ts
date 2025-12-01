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
import { DistrictHttpDto } from '../dtos/http/district-http-dto/district-http.dto';
import { DistrictCreate } from '../../application/use-cases/district/district-create';
import { DistrictUpdate } from '../../application/use-cases/district/district-update';
import { DistrictGetAll } from '../../application/use-cases/district/district-get-all';
import { DistrictGetOneById } from '../../application/use-cases/district/district-get-one-by-id';
import { DistrictDelete } from '../../application/use-cases/district/district-delete';
import { CreateDistrictDto } from '../dtos/validators/district/create-district.dto';
import { UpdateDistrictDto } from '../dtos/validators/district/update-district.dto';

type DistrictGetAllResponse =
  | HttpPaginatedResponseDto<DistrictHttpDto>
  | DistrictHttpDto[];
@Controller('districts')
export class DistrictController {
  constructor(
    private readonly districtCreate: DistrictCreate,
    private readonly districtUpdate: DistrictUpdate,
    private readonly districtGetAll: DistrictGetAll,
    private readonly districtGetOneById: DistrictGetOneById,
    private readonly districtDelete: DistrictDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() districtCreateRequest: CreateDistrictDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.districtCreate.run(districtCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'District created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() districtUpdateRequest: UpdateDistrictDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.districtUpdate.run({ ...districtUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'District updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<DistrictGetAllResponse>> {
    const { districts, total } = await this.districtGetAll.run(
      page,
      per_page,
      filter,
    );
    const districtDtoHttp = districts.map((district) =>
      DistrictHttpDto.fromEntity(district),
    );
    if (page !== undefined && per_page !== undefined) {
      const total_page = Math.ceil(total / per_page);

      const paginatedResponse = new HttpPaginatedResponseDto(
        districtDtoHttp,
        total,
        total_page,
        page,
        per_page,
      );

      return new SuccessResponseDto(
        paginatedResponse,
        HttpStatus.OK,
        'Districts retrieved successfully',
      );
    }
    return new SuccessResponseDto(
      districtDtoHttp,
      HttpStatus.OK,
      'Districts retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DistrictHttpDto>> {
    const district = await this.districtGetOneById.run(id);
    if (!district) {
      throw new NotFoundException('District', id.toString());
    }
    const districtDtoHttp = DistrictHttpDto.fromEntity(district);
    return new SuccessResponseDto<DistrictHttpDto>(
      districtDtoHttp,
      HttpStatus.OK,
      'District retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.districtDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'District deleted successfully',
    );
  }
}
