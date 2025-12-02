import { Person } from '@/modules/profile/domain/entities/person';
import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonGetAll {
  constructor(protected readonly personRepository: PersonRepository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ people: Person[]; total: number }> {
    return await this.personRepository.getAll(page, per_page, filter);
  }
}
