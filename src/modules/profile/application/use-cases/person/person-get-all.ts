import { Person } from '@/modules/profile/domain/entities/person';
import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonGetAll {
  constructor(protected readonly personRepository: PersonRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Person> | Person[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.personRepository.getAll(paginationParams, filter);
    }
    return await this.personRepository.getAll(undefined, filter);
  }
}
