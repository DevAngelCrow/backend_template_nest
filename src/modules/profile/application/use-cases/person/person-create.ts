import { Person } from '@/modules/profile/domain/entities/person';
import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { PersonDto } from '../../dtos/person.dto';

export class PersonCreate {
  constructor(protected readonly personRepository: PersonRepository) {}
  public async run(person_dto: PersonDto): Promise<Person | void> {
    const person = Person.create({
      first_name: person_dto.first_name,
      birthdate: person_dto.birthdate,
      id_gender: person_dto.id_gender,
      email: person_dto.email,
      id_marital_status: person_dto.id_marital_status,
      phone: person_dto.phone,
      id_status: person_dto.id_status,
      middle_name: person_dto.middle_name,
      last_name: person_dto.last_name,
      img_path: person_dto.img_path,
    });
    const nationalities = person_dto.nationalities;
    return await this.personRepository.create(person, nationalities);
  }
}
