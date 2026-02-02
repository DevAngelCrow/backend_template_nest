import { UserRolDto } from '../../dtos/user-rol.dto';
import { UserRoleCreate } from '../../use-cases/user-rol/user-role-create';

export class CreateUserRoleService {
  constructor(private readonly userRoleCreate: UserRoleCreate) {}
  async run(user_role_dto: UserRolDto): Promise<void> {
    return await this.userRoleCreate.run(user_role_dto);
  }
}
