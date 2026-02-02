import { PersonRepository } from '@/modules/profile/domain/repositories/person.repository';
import { DeletePersonCommand } from './delete-person.command';
import { PersonId } from '@/modules/profile/domain/value-objects/person-value-object/person-id';

export class DeletePersonHandler {
  constructor(private readonly repository: PersonRepository) {}

  async execute(command: DeletePersonCommand): Promise<void> {
    await this.repository.delete(new PersonId(command.id));
  }
}
