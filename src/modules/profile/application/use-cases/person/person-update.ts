import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { Injectable } from '@nestjs/common';
import { PersonDto } from '../../dtos/person.dto';
import { Person } from '@/modules/profile/domain/entities/person';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

@Injectable()
export default class PersonUpdate {
  constructor(private readonly personRepository: PersonRepository) {}
  public async run(person_dto: PersonDto): Promise<void> {
    const person = Person.create({ ...person_dto });
    const nationalities = person_dto.nationalities;
    const personId = person.getId();
    if (!personId) {
      throw new Error(`Person id is undefined`);
    }
    const foundPerson = await this.personRepository.getOneById(personId);
    if (!foundPerson) {
      throw new NotFoundException('Person', personId.value().toString());
    }
    await this.personRepository.update(person, nationalities);
  }
}
