import { GetPersonByEmailQuery } from './get-person-by-email.query';
import { PersonReadRepository } from '../../../repositories/person-read.repository';
import { PersonEmail } from '@/modules/profile/domain/value-objects/person-value-object/person-email';

export class GetPersonByEmailHandler {
  constructor(private readonly repository: PersonReadRepository) {}
  async execute(query: GetPersonByEmailQuery) {
    return await this.repository.getOneByEmail(new PersonEmail(query.email));
  }
}
