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
import { CreateProviderStorageDto } from '../dtos/validators/provider-storage/create-provider-storage.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { UpdateProviderStorageDto } from '../dtos/validators/provider-storage/update-provider-storage.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { ProviderStorageHttpDto } from '../dtos/http/provider-storage-http-dto/provider-storage-http.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProviderStorageCommand } from '../../application/provider-storage/commands/create-provider-storage/create-provider-storage.command';
import { UpdateProviderStorageCommand } from '../../application/provider-storage/commands/update-provider-storage/update-provider-storage.command';
import { DeleteProviderStorageCommand } from '../../application/provider-storage/commands/delete-provider-storage/delete-provider-storage.command';
import { GetProviderStoragesQuery } from '../../application/provider-storage/queries/get-provider-storages/get-provider-storages.query';
import { GetProviderStorageQuery } from '../../application/provider-storage/queries/get-provider-storage/get-provider-storage.query';
import { GetProviderStorageByCodeQuery } from '../../application/provider-storage/queries/get-provider-storage-by-code/get-provider-storage-by-code.query';
import { ProviderStorageDto } from '../../application/dtos/provider-storage.dto';

type ProviderStorageGetAllResponse =
  | HttpPaginatedResponseDto<ProviderStorageHttpDto>
  | ProviderStorageHttpDto[];

@Controller('provider-storages')
@ApiBearerAuth('JWT-auth')
export class ProviderStorageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() providerStorageCreateRequest: CreateProviderStorageDto,
  ): Promise<SuccessResponseDto<null>> {
    const providerStorageDto = new ProviderStorageDto(
      providerStorageCreateRequest.name,
      providerStorageCreateRequest.code,
      providerStorageCreateRequest.description,
      providerStorageCreateRequest.active,
    );
    const command = new CreateProviderStorageCommand(providerStorageDto);
    await this.commandBus.execute(command);
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
    const providerStorageDto = new ProviderStorageDto(
      providerStorageUpdateRequest.name,
      providerStorageUpdateRequest.code,
      providerStorageUpdateRequest.description,
      providerStorageUpdateRequest.active,
      id,
    );
    const command = new UpdateProviderStorageCommand(providerStorageDto);
    await this.commandBus.execute(command);
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
    const paginationParams =
      page && per_page ? new PaginationParamsDto(page, per_page) : undefined;

    const query = new GetProviderStoragesQuery(paginationParams, filter);
    const result = await this.queryBus.execute(query);

    if (result instanceof Pagination) {
      const providerStoragesHttpDto = result
        .getEntityList()
        .map((providerStorage) =>
          ProviderStorageHttpDto.fromEntity(providerStorage),
        );
      const paginatedProviderStoragesResponse =
        new HttpPaginatedResponseDto<ProviderStorageHttpDto>(
          providerStoragesHttpDto,
          result.getTotalItems(),
          result.getTotalPages(),
          result.getPage(),
          result.getPerPage(),
        );
      return new SuccessResponseDto<
        HttpPaginatedResponseDto<ProviderStorageHttpDto>
      >(
        paginatedProviderStoragesResponse,
        HttpStatus.OK,
        'ProviderStorages retrieved successfully',
      );
    }

    const providerStoragesHttpDto = Array.isArray(result)
      ? result.map((providerStorage) =>
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
    const query = new GetProviderStorageQuery(id);
    const providerStorage = await this.queryBus.execute(query);

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
    const query = new GetProviderStorageByCodeQuery(code);
    const providerStorage = await this.queryBus.execute(query);

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
    const command = new DeleteProviderStorageCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'ProviderStorage deleted successfully',
    );
  }
}
