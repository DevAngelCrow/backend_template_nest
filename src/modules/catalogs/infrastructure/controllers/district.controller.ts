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
import { DistrictHttpDto } from '../dtos/http/district-http-dto/district-http.dto';
import { CreateDistrictDto } from '../dtos/validators/district/create-district.dto';
import { UpdateDistrictDto } from '../dtos/validators/district/update-district.dto';
import { ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDistrictCommand } from '../../application/district/commands/create-district/create-district.command';
import { UpdateDistrictCommand } from '../../application/district/commands/update-district/update-district.command';
import { DeleteDistrictCommand } from '../../application/district/commands/delete-district/delete-district.command';
import { GetDistrictsQuery } from '../../application/district/queries/get-districts/get-districts.query';
import { GetDistrictQuery } from '../../application/district/queries/get-district/get-district.query';
import { District } from '../../domain/entities/district';

type DistrictGetAllResponse =
  | HttpPaginatedResponseDto<DistrictHttpDto>
  | DistrictHttpDto[];
@Controller('districts')
@ApiBearerAuth('JWT-auth')
export class DistrictController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() districtCreateRequest: CreateDistrictDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateDistrictCommand(districtCreateRequest);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'District created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() districtUpdateRequest: UpdateDistrictDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new UpdateDistrictCommand({ ...districtUpdateRequest, id });
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'District updated successfully',
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
  ): Promise<SuccessResponseDto<DistrictGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const query = new GetDistrictsQuery(paginationParams, filter);

      const districtsPagination = await this.queryBus.execute(query);

      if (districtsPagination instanceof Pagination) {
        const districtsHttpDto = districtsPagination
          .getEntityList()
          .map((district: District) => DistrictHttpDto.fromEntity(district));
        const paginatedDistrictsResponse =
          new HttpPaginatedResponseDto<DistrictHttpDto>(
            districtsHttpDto,
            districtsPagination.getTotalItems(),
            districtsPagination.getTotalPages(),
            districtsPagination.getPage(),
            districtsPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<DistrictHttpDto>
        >(
          paginatedDistrictsResponse,
          HttpStatus.OK,
          'Districts retrieved successfully',
        );
      }
    }

    const query = new GetDistrictsQuery();
    const districts = await this.queryBus.execute(query);

    const districtsHttpDto = Array.isArray(districts)
      ? districts.map((district) => DistrictHttpDto.fromEntity(district))
      : [];
    return new SuccessResponseDto<DistrictHttpDto[]>(
      districtsHttpDto,
      HttpStatus.OK,
      'Districts retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  @ApiParam({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DistrictHttpDto>> {
    const query = new GetDistrictQuery(id);
    const district = await this.queryBus.execute(query);
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
  @ApiParam({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    const command = new DeleteDistrictCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'District deleted successfully',
    );
  }
}
