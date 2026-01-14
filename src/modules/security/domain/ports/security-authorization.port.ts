import { Menu } from '../entities/menu';

export abstract class SecurityAuthorizationPort {
  abstract hasRole(role: string[], id_user: number): Promise<boolean>;
  abstract checkPermission(
    permission: string,
    id_user: number,
  ): Promise<boolean>;
  abstract filterRoutesForUser<T, P>(id_user: number): Promise<Menu<T, P>[]>;
}
