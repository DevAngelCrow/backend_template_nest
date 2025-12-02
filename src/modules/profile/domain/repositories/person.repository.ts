import { Person } from '../entities/person';
import { PersonEmail } from '../value-objects/person-value-object/person-email';
import { PersonId } from '../value-objects/person-value-object/person-id';

export abstract class PersonRepository {
  abstract create(
    person: Person,
    nationalities: number[],
  ): Promise<Person | void>;
  abstract update(person: Person, nationalities: number[]): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ people: Person[]; total: number }>;
  abstract getOneById(id: PersonId): Promise<Person | null>;
  abstract getOneByEmail(email: PersonEmail): Promise<Person | null>;
  abstract delete(id: PersonId): Promise<void>;
}
