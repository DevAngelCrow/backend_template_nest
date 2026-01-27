import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { PersonId } from '../../domain/value-objects/person-value-object/person-id';
import { Person } from '../../domain/entities/person';
import { PersonEmail } from '../../domain/value-objects/person-value-object/person-email';

export abstract class PersonReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Person> | Person[]>;
  abstract getOneById(id: PersonId): Promise<Person | null>;
  abstract getOneByEmail(email: PersonEmail): Promise<Person | null>;
}
