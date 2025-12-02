import { Person } from '@/modules/profile/domain/entities/person';
import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { PersonId } from '@/modules/profile/domain/value-objects/person-value-object/person-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PersonGetOneById {
  constructor(private readonly personRepository: PersonRepository) {}
  public async run(id: number): Promise<Person | null> {
    const personId = new PersonId(id);

    const person = await this.personRepository.getOneById(personId);
    if (!person) {
      throw new NotFoundException('Person', id.toString());
    }
    return person;
  }
}
