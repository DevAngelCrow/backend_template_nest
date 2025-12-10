import { Person } from '@/modules/profile/domain/entities/person';
import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { PersonEmail } from '@/modules/profile/domain/value-objects/person-value-object/person-email';

import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class PersonGetOneByEmail {
  constructor(private readonly personRepository: PersonRepository) {}
  public async run(email: string): Promise<Person | null> {
    const person = await this.personRepository.getOneByEmail(
      new PersonEmail(email),
    );
    if (!person) {
      throw new NotFoundException('Person', email);
    }
    return person;
  }
}
