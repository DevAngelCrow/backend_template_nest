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
import { RouteCreate } from '../../application/use-cases/route/route-create';
import { RouteUpdate } from '../../application/use-cases/route/route-update';
import { RouteGetAll } from '../../application/use-cases/route/route-get-all';
import { RouteGetOneById } from '../../application/use-cases/route/route-get-one-by-id';
import { RouteDelete } from '../../application/use-cases/route/route-delete';
import { RouteRequestDto } from '../dtos/validators/route/route.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { RouteHttpDto } from '../dtos/http/route-http-dto/route-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Route } from '../../domain/entities/route';
import { ApiBearerAuth } from '@nestjs/swagger';

type RouteGetAllResponse =
  | HttpPaginatedResponseDto<RouteHttpDto>
  | RouteHttpDto[];

@Controller('routes')
@ApiBearerAuth('JWT-auth')
export class RouteController {
  constructor(
    private readonly routeCreate: RouteCreate,
    private readonly routeUpdate: RouteUpdate,
    private readonly routeGetAll: RouteGetAll,
    private readonly routeGetOneById: RouteGetOneById,
    private readonly routeDelete: RouteDelete,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() routeCreateRequest: RouteRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.routeCreate.run(routeCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Route created successfully',
    );
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() routeUpdateRequest: RouteRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.routeUpdate.run({ ...routeUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Route updated successfully',
    );
  }

  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<RouteGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const routesPagination = await this.routeGetAll.run(
        paginationParams,
        filter,
      );
      if (routesPagination instanceof Pagination) {
        const routesHttpDto = routesPagination
          .getEntityList()
          .map((route: Route) => RouteHttpDto.fromEntity(route));
        const paginatedRoutesResponse =
          new HttpPaginatedResponseDto<RouteHttpDto>(
            routesHttpDto,
            routesPagination.getTotalItems(),
            routesPagination.getTotalPages(),
            routesPagination.getPage(),
            routesPagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<RouteHttpDto>>(
          paginatedRoutesResponse,
          HttpStatus.OK,
          'Routes retrieved successfully',
        );
      }
    }

    const routes = await this.routeGetAll.run(undefined, filter);

    const routesHttpDto =
      routes instanceof Array
        ? routes.map((route) => RouteHttpDto.fromEntity(route))
        : [];
    return new SuccessResponseDto<RouteHttpDto[]>(
      routesHttpDto,
      HttpStatus.OK,
      'Routes retrieved successfully',
    );
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<RouteHttpDto>> {
    const route = await this.routeGetOneById.run(id);
    if (!route) {
      throw new NotFoundException('Route', id.toString());
    }
    const routeDtoHttp = RouteHttpDto.fromEntity(route);
    return new SuccessResponseDto<RouteHttpDto>(
      routeDtoHttp,
      HttpStatus.OK,
      'Route retrieved successfully',
    );
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.routeDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Route deleted successfully',
    );
  }
}
