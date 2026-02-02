import { RolRepository } from '@/modules/security/domain/repositories/rol-repository';
import { RolId } from '@/modules/security/domain/value-objects/rol-value-object/rol-id';
import { GetRolByIdQuery } from './get-rol-by-id.query';

export class GetRolByIdHandler {
  constructor(private readonly repository: RolRepository) {}

  async execute(query: GetRolByIdQuery) {
    return await this.repository.getOneById(new RolId(query.id));
  }
}
