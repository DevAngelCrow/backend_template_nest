import { PermissionsRepository } from '@/modules/security/domain/repositories/permissions-repository';
import { PermissionsId } from '@/modules/security/domain/value-objects/permissions-value-object/permissions-id';
import { GetPermissionsByIdQuery } from './get-permissions-by-id.query';

export class GetPermissionsByIdHandler {
  constructor(private readonly repository: PermissionsRepository) {}

  async execute(query: GetPermissionsByIdQuery) {
    return await this.repository.getOneById(new PermissionsId(query.id));
  }
}
