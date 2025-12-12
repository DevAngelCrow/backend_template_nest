import { UserRoleId } from '../value-objects/user-role-value-object/user-role-id';
import { Rol } from '../entities/rol';
import { UserRoleIdUser } from '../value-objects/user-role-value-object/user-role-id-user';

export class UserRoleAggregate {
  constructor(
    private readonly id: UserRoleId,
    private readonly id_user: UserRoleIdUser,
    private readonly role: Rol[],
  ) {}
  getId(): UserRoleId {
    return this.id;
  }
  getUser(): UserRoleIdUser {
    return this.id_user;
  }
  addRole(rol: Rol): void {
    this.role.push(rol);
  }
  getRoles(): Rol[] {
    return this.role;
  }
}
