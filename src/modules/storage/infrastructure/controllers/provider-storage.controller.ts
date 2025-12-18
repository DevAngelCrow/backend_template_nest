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
import { ProviderStorageCreate } from '../../application/use-cases/provider-storage/provider-storage-create';
import { CreateProviderStorageDto } from '../dtos/validators/provider-storage/create-provider-storage.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { ProviderStorageUpdate } from '../../application/use-cases/provider-storage/provider-storage-update';
import { UpdateProviderStorageDto } from '../dtos/validators/provider-storage/update-provider-storage.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';

import { ProviderStorageGetAll } from '../../application/use-cases/provider-storage/provider-storage-get-all';
import { ProviderStorageGetOneById } from '../../application/use-cases/provider-storage/provider-storage-get-one-by-id';
import { ProviderStorageDelete } from '../../application/use-cases/provider-storage/provider-storage-delete';
import { ProviderStorageHttpDto } from '../dtos/http/provider-storage-http-dto/provider-storage-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { ProviderStorageGetOneByCode } from '../../application/use-cases/provider-storage/provider-storage-get-one-by-code';
import { ApiBearerAuth } from '@nestjs/swagger';

type ProviderStorageGetAllResponse =
  | HttpPaginatedResponseDto<ProviderStorageHttpDto>
  | ProviderStorageHttpDto[];
@Controller('provider-storages')
@ApiBearerAuth('JWT-auth')
export class ProviderStorageController {
  constructor(
    private readonly providerStorageCreate: ProviderStorageCreate,
    private readonly providerStorageUpdate: ProviderStorageUpdate,
    private readonly providerStorageGetAll: ProviderStorageGetAll,
    private readonly providerStorageGetOneById: ProviderStorageGetOneById,
    private readonly providerStorageDelete: ProviderStorageDelete,
    private readonly providerStorageGetOneByCode: ProviderStorageGetOneByCode,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() providerStorageCreateRequest: CreateProviderStorageDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.providerStorageCreate.run(providerStorageCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'ProviderStorage created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() providerStorageUpdateRequest: UpdateProviderStorageDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.providerStorageUpdate.run({
      ...providerStorageUpdateRequest,
      id,
    });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'ProviderStorage updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<ProviderStorageGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const providerStoragesPagination = await this.providerStorageGetAll.run(
        paginationParams,
        filter,
      );
      if (providerStoragesPagination instanceof Pagination) {
        const providerStoragesHttpDto = providerStoragesPagination
          .getEntityList()
          .map((providerStorage) =>
            ProviderStorageHttpDto.fromEntity(providerStorage),
          );
        const paginatedProviderStoragesResponse =
          new HttpPaginatedResponseDto<ProviderStorageHttpDto>(
            providerStoragesHttpDto,
            providerStoragesPagination.getTotalItems(),
            providerStoragesPagination.getTotalPages(),
            providerStoragesPagination.getPage(),
            providerStoragesPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<ProviderStorageHttpDto>
        >(
          paginatedProviderStoragesResponse,
          HttpStatus.OK,
          'ProviderStorages retrieved successfully',
        );
      }
    }

    const providerStorages = await this.providerStorageGetAll.run(
      undefined,
      filter,
    );

    const providerStoragesHttpDto =
      providerStorages instanceof Array
        ? providerStorages.map((providerStorage) =>
            ProviderStorageHttpDto.fromEntity(providerStorage),
          )
        : [];
    return new SuccessResponseDto<ProviderStorageHttpDto[]>(
      providerStoragesHttpDto,
      HttpStatus.OK,
      'ProviderStorages retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<ProviderStorageHttpDto>> {
    const providerStorage = await this.providerStorageGetOneById.run(id);
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', id.toString());
    }
    const providerStorageDtoHttp =
      ProviderStorageHttpDto.fromEntity(providerStorage);
    return new SuccessResponseDto<ProviderStorageHttpDto>(
      providerStorageDtoHttp,
      HttpStatus.OK,
      'ProviderStorage retrieved successfully',
    );
  }
  @Get('code/:code')
  @HttpCode(200)
  async getOneByCode(
    @Param('code') code: string,
  ): Promise<SuccessResponseDto<ProviderStorageHttpDto>> {
    const providerStorage = await this.providerStorageGetOneByCode.run(code);
    if (!providerStorage) {
      throw new NotFoundException('ProviderStorage', code.toString());
    }
    const providerStorageDtoHttp =
      ProviderStorageHttpDto.fromEntity(providerStorage);
    return new SuccessResponseDto<ProviderStorageHttpDto>(
      providerStorageDtoHttp,
      HttpStatus.OK,
      'ProviderStorage retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.providerStorageDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'ProviderStorage deleted successfully',
    );
  }
}
