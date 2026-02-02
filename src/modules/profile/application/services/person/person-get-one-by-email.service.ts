import { Person } from '@/modules/profile/domain/entities/person';
import { PersonGetOneByEmail } from '../../use-cases/person/person-get-one-by-email';
export class PersonGetOneByEmailService {
  constructor(private readonly personGetOneByEmail: PersonGetOneByEmail) {}
  async run(email: string): Promise<Person | null> {
    return await this.personGetOneByEmail.run(email);
  }
}
