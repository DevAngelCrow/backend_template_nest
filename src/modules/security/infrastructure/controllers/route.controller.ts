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
import { RouteRequestDto } from '../dtos/validators/route/route.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { RouteHttpDto } from '../dtos/http/route-http-dto/route-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Route } from '../../domain/entities/route';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRouteCommand } from '../../application/route/commands/create-route/create-route.command';
import { UpdateRouteCommand } from '../../application/route/commands/update-route/update-route.command';
import { DeleteRouteCommand } from '../../application/route/commands/delete-route/delete-route.command';
import { GetRoutesQuery } from '../../application/route/queries/get-routes/get-routes.query';
import { GetRouteByIdQuery } from '../../application/route/queries/get-route-by-id/get-route-by-id.query';

type RouteGetAllResponse =
  | HttpPaginatedResponseDto<RouteHttpDto>
  | RouteHttpDto[];

@Controller('routes')
@ApiBearerAuth('JWT-auth')
export class RouteController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() routeCreateRequest: RouteRequestDto,
  ): Promise<SuccessResponseDto<null>> {
    const command = new CreateRouteCommand(routeCreateRequest);
    await this.commandBus.execute(command);
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
    const command = new UpdateRouteCommand({ ...routeUpdateRequest, id });
    await this.commandBus.execute(command);
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
      const query = new GetRoutesQuery(paginationParams, filter);
      const routesPagination = await this.queryBus.execute(query);
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

    const query = new GetRoutesQuery(undefined, filter);
    const routes = await this.queryBus.execute(query);

    const routesHttpDto = Array.isArray(routes)
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
    const query = new GetRouteByIdQuery(id);
    const route = await this.queryBus.execute(query);
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
    const command = new DeleteRouteCommand(id);
    await this.commandBus.execute(command);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Route deleted successfully',
    );
  }
}
