import { UserRoleRepository } from '@/modules/security/domain/repositories/user-rol-repository';
import { UserRolDto } from '../../dtos/user-rol.dto';
import { UserRoleAggregate } from '@/modules/security/domain/aggregates/user-role.aggregate';

export class UserRoleCreate {
  constructor(protected readonly repository: UserRoleRepository) {}
  public async run(user_role_dto: UserRolDto): Promise<void> {
    const userRoleAggregate = UserRoleAggregate.create({
      id: user_role_dto.id,
      user_id: user_role_dto.user_id,
      role_id: user_role_dto.role_id,
    });
    await this.repository.create(userRoleAggregate);
  }
}
