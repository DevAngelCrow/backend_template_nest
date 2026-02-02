import { PersonId } from '@/modules/profile/domain/value-objects/person-value-object/person-id';
import { GetPersonByIdQuery } from './get-person-by-id.query';
import { PersonReadRepository } from '../../../repositories/person-read.repository';

export class GetPersonByIdHandler {
  constructor(private readonly repository: PersonReadRepository) {}
  async execute(query: GetPersonByIdQuery) {
    return await this.repository.getOneById(new PersonId(query.id));
  }
}
