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
import { CountryCreate } from '../../application/use-cases/country/country-create';
import { CreateCountryDto } from '../dtos/validators/country/create-country.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { CountryUpdate } from '../../application/use-cases/country/country-update';
import { UpdateCountryDto } from '../dtos/validators/country/update-country.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';

import { CountryGetAll } from '../../application/use-cases/country/country-get-all';
import { CountryGetOneById } from '../../application/use-cases/country/country-get-one-by-id';
import { CountryDelete } from '../../application/use-cases/country/country-delete';
import { CountryHttpDto } from '../dtos/http/country-http-dto/country-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Country } from '../../domain/entities/country';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

type CountryGetAllResponse =
  | HttpPaginatedResponseDto<CountryHttpDto>
  | CountryHttpDto[];

@Controller('countries')
@ApiBearerAuth('JWT-auth')
export class CountryController {
  constructor(
    private readonly countryCreate: CountryCreate,
    private readonly countryUpdate: CountryUpdate,
    private readonly countryGetAll: CountryGetAll,
    private readonly countryGetOneById: CountryGetOneById,
    private readonly countryDelete: CountryDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() countryCreateRequest: CreateCountryDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.countryCreate.run(countryCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Country created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  @ApiQuery({ name: 'id', required: true, type: Number })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() countryUpdateRequest: UpdateCountryDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.countryUpdate.run({ ...countryUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Country updated successfully',
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
  ): Promise<SuccessResponseDto<CountryGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const countriesPagination = await this.countryGetAll.run(
        paginationParams,
        filter,
      );
      if (countriesPagination instanceof Pagination) {
        const countriesHttpDto = countriesPagination
          .getEntityList()
          .map((country: Country) => CountryHttpDto.fromEntity(country));
        const paginatedCountriesResponse =
          new HttpPaginatedResponseDto<CountryHttpDto>(
            countriesHttpDto,
            countriesPagination.getTotalItems(),
            countriesPagination.getTotalPages(),
            countriesPagination.getPage(),
            countriesPagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<CountryHttpDto>>(
          paginatedCountriesResponse,
          HttpStatus.OK,
          'Countries retrieved successfully',
        );
      }
    }

    const countries = await this.countryGetAll.run(undefined, filter);

    const countriesHttpDto =
      countries instanceof Array
        ? countries.map((country) => CountryHttpDto.fromEntity(country))
        : [];
    return new SuccessResponseDto<CountryHttpDto[]>(
      countriesHttpDto,
      HttpStatus.OK,
      'Countries retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  @ApiQuery({ name: 'id', required: true, type: Number })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<CountryHttpDto>> {
    const country = await this.countryGetOneById.run(id);
    if (!country) {
      throw new NotFoundException('Country', id.toString());
    }
    const countryDtoHttp = CountryHttpDto.fromEntity(country);
    return new SuccessResponseDto<CountryHttpDto>(
      countryDtoHttp,
      HttpStatus.OK,
      'Country retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  @ApiQuery({ name: 'id', required: true, type: Number })
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.countryDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Country deleted successfully',
    );
  }
}
