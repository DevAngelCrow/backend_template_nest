import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PersonCreate } from '../../application/use-cases/person/person-create';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';
import { PersonHttpDto } from '../dtos/http/person-http-dto/person-http.dto';
import { CreatePersonDto } from '../dtos/validators/person/create-person.dto';
import PersonUpdate from '../../application/use-cases/person/person-update';
import { PersonGetOneById } from '../../application/use-cases/person/person-get-one-by-id';
import { PersonGetAll } from '../../application/use-cases/person/person-get-all';
import { PersonGetOneByEmail } from '../../application/use-cases/person/person-get-one-by-email';
import { UpdatePersonDto } from '../dtos/validators/person/update-person.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { HttpPaginatedResponseDto } from '@/shared/infrastructure/http/dtos/http-paginated-response.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';

type PersonGetAllResponse =
  | HttpPaginatedResponseDto<PersonHttpDto>
  | PersonHttpDto[];
@Controller('people')
export class PersonController {
  constructor(
    private readonly personCreate: PersonCreate,
    private readonly personUpdate: PersonUpdate,
    private readonly personGetOneById: PersonGetOneById,
    private readonly personGetAll: PersonGetAll,
    private readonly personGetOneByEmail: PersonGetOneByEmail,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() personCreateRequest: CreatePersonDto,
  ): Promise<SuccessResponseDto<PersonHttpDto | null>> {
    const person = await this.personCreate.run(personCreateRequest);
    let personHttpDto: PersonHttpDto | null;
    if (person) {
      personHttpDto = PersonHttpDto.fromEntity(person);
      return new SuccessResponseDto<PersonHttpDto>(
        personHttpDto,
        201,
        'Person created successfully',
      );
    }
    return new SuccessResponseDto<null>(
      null,
      201,
      'Person creation successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePersonRequest: UpdatePersonDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.personUpdate.run({ id, ...updatePersonRequest });
    return new SuccessResponseDto<null>(
      null,
      200,
      'Person updated successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<PersonHttpDto>> {
    const person = await this.personGetOneById.run(id);
    if (!person) {
      throw new NotFoundException('Person', id.toString());
    }
    const personHttpDto = PersonHttpDto.fromEntity(person);
    return new SuccessResponseDto<PersonHttpDto>(
      personHttpDto,
      200,
      'Person retrieved successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<PersonGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const peoplePagination = await this.personGetAll.run(
        paginationParams,
        filter,
      );
      if (peoplePagination instanceof Pagination) {
        const peopleHttpDto = peoplePagination
          .getEntityList()
          .map((person) => PersonHttpDto.fromEntity(person));
        const paginatedPeopleResponse =
          new HttpPaginatedResponseDto<PersonHttpDto>(
            peopleHttpDto,
            peoplePagination.getTotalItems(),
            peoplePagination.getTotalPages(),
            peoplePagination.getPage(),
            peoplePagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<PersonHttpDto>>(
          paginatedPeopleResponse,
        );
      }
    }

    const people = await this.personGetAll.run(undefined, filter);

    const peopleHttpDto =
      people instanceof Array
        ? people.map((person) => PersonHttpDto.fromEntity(person))
        : [];
    return new SuccessResponseDto<PersonHttpDto[]>(peopleHttpDto);
  }
}
