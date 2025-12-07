import { Person } from '@/modules/profile/domain/entities/person';
import { PersonDto } from '../../dtos/person.dto';
import { PersonCreate } from '../../use-cases/person/person-create';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PersonCreateService {
  constructor(private readonly personCreate: PersonCreate) {}
  async run(person_dto: PersonDto): Promise<Person | void> {
    return await this.personCreate.run(person_dto);
  }
}
