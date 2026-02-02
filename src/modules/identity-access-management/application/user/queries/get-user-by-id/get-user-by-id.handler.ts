import { UserRepository } from '@/modules/identity-access-management/domain/repositories/user-repository';
import { UserId } from '@/modules/identity-access-management/domain/value-objects/user-value-object/user-id';
import { GetUserByIdQuery } from './get-user-by-id.query';

export class GetUserByIdHandler {
  constructor(private readonly repository: UserRepository) {}
  async execute(query: GetUserByIdQuery) {
    return await this.repository.getOneById(new UserId(query.id));
  }
}
