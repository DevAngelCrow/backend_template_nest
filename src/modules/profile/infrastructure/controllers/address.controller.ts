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
import { AddressCreate } from '../../application/use-cases/address/address-create';
import { CreateAddressDto } from '../dtos/validators/address/create-addres.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { AddressUpdate } from '../../application/use-cases/address/address-update';
import { UpdateAddressDto } from '../dtos/validators/address/update-address.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';

import { AddressGetAll } from '../../application/use-cases/address/address-get-all';
import { AddressGetOneById } from '../../application/use-cases/address/address-get-one-by-id';
import { AddressDelete } from '../../application/use-cases/address/address-delete';
import { AddressHttpDto } from '../dtos/http/address-http-dto/address-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

type AddressGetAllResponse =
  | HttpPaginatedResponseDto<AddressHttpDto>
  | AddressHttpDto[];
@Controller('addresses')
@ApiBearerAuth('JWT-auth')
export class AddressController {
  constructor(
    private readonly addressCreate: AddressCreate,
    private readonly addressUpdate: AddressUpdate,
    private readonly addressGetAll: AddressGetAll,
    private readonly addressGetOneById: AddressGetOneById,
    private readonly addressDelete: AddressDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() addressCreateRequest: CreateAddressDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.addressCreate.run(addressCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Address created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() addressUpdateRequest: UpdateAddressDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.addressUpdate.run({ ...addressUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Address updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<AddressGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const addressesPagination = await this.addressGetAll.run(
        paginationParams,
        filter,
      );
      if (addressesPagination instanceof Pagination) {
        const addressesHttpDto = addressesPagination
          .getEntityList()
          .map((address) => AddressHttpDto.fromEntity(address));
        const paginatedAddressesResponse =
          new HttpPaginatedResponseDto<AddressHttpDto>(
            addressesHttpDto,
            addressesPagination.getTotalItems(),
            addressesPagination.getTotalPages(),
            addressesPagination.getPage(),
            addressesPagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<AddressHttpDto>>(
          paginatedAddressesResponse,
          HttpStatus.OK,
          'Addresses retrieved successfully',
        );
      }
    }

    const addresses = await this.addressGetAll.run(undefined, filter);

    const addressesHttpDto =
      addresses instanceof Array
        ? addresses.map((address) => AddressHttpDto.fromEntity(address))
        : [];
    return new SuccessResponseDto<AddressHttpDto[]>(
      addressesHttpDto,
      HttpStatus.OK,
      'Addresses retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<AddressHttpDto>> {
    const address = await this.addressGetOneById.run(id);
    if (!address) {
      throw new NotFoundException('Address', id.toString());
    }
    const addressDtoHttp = AddressHttpDto.fromEntity(address);
    return new SuccessResponseDto<AddressHttpDto>(
      addressDtoHttp,
      HttpStatus.OK,
      'Address retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.addressDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Address deleted successfully',
    );
  }
}
