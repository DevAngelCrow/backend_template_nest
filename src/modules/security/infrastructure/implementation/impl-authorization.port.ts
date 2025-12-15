import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { SecurityAuthorizationPort } from '../../domain/ports/security-authorization.port';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Menu } from '../../domain/entities/menu';
import { Permissions } from '../../domain/entities/permissions';
import { MenuActive } from '../../domain/value-objects/menu-value-object/menu-active';
import { MenuChildren } from '../../domain/value-objects/menu-value-object/menu-children';
import { MenuDescription } from '../../domain/value-objects/menu-value-object/menu-description';
import { MenuIcon } from '../../domain/value-objects/menu-value-object/menu-icon';
import { MenuName } from '../../domain/value-objects/menu-value-object/menu-name';
import { MenuOrder } from '../../domain/value-objects/menu-value-object/menu-order';
import { MenuParent } from '../../domain/value-objects/menu-value-object/menu-parent';
import { MenuRequiredAuth } from '../../domain/value-objects/menu-value-object/menu-required-auth';
import { MenuShow } from '../../domain/value-objects/menu-value-object/menu-show';
import { MenuTitle } from '../../domain/value-objects/menu-value-object/menu-title';
import { MenuUri } from '../../domain/value-objects/menu-value-object/menu-uri';
import { MenuPermissions } from '../../domain/value-objects/menu-value-object/menu-permissions';
import { MenuId } from '../../domain/value-objects/menu-value-object/menu-id';

interface menu {
  active: boolean;
  description: string;
  icon: string;
  name: string;
  order: number;
  parent: menu | null;
  required_auth: boolean;
  show: boolean;
  title: string;
  uri: string;
  permissions: permission[];
  children: menu[];
}
interface permission {
id: number;
    name: string;
    description: string;
    id_category_permission: number;
    active: boolean;
}
export class ImplSecurityAuthorizationPort implements SecurityAuthorizationPort {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async hasRole(role: string[], id_user: number): Promise<boolean> {
    try {
      const prisma = this.getPrismaClient();
      const user = await prisma.mnt_user.findUnique({
        where: { id: id_user },
        include: {
          mnt_user_rol: {
            include: {
              mnt_role: { select: { name: true } },
            },
          },
        },
      });
      if (!user) {
        return Promise.resolve(false);
      }
      return user.mnt_user_rol.some((rol) => role.includes(rol.mnt_role.name));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  }
  async checkPermission(permission: string, id_user: number): Promise<boolean> {
    try {
      const prisma = this.getPrismaClient();
      const user = await prisma.mnt_user.findUnique({
        where: { id: id_user },
        include: {
          mnt_user_rol: {
            include: {
              mnt_role: {
                include: {
                  rol_permissions: {
                    include: {
                      ctl_permissions: {
                        select: { name: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!user) {
        return Promise.resolve(false);
      }
      const permissions = user.mnt_user_rol
        .flatMap((userRol) => userRol.mnt_role.rol_permissions)
        .flatMap((rolPermission) => rolPermission.ctl_permissions)
        .map((perm) => perm.name);
      return permissions.includes(permission);
    } catch (error) {
      throw new Error(String(error));
    }
  }
  async filterRoutesForUser<T, P>(id_user: number): Promise<Menu<T, P>[]> {
    try {
      const prisma = this.getPrismaClient();
      const user = await prisma.mnt_user.findUnique({
        where: { id: id_user },
        include: {
          mnt_user_rol: {
            include: {
              mnt_role: {
                include: {
                  rol_permissions: {
                    include: {
                      ctl_permissions: {
                        select: { id: true },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
      if (!user) {
        return Promise.resolve([]);
      }
      const permissionIds = user.mnt_user_rol
        .flatMap((userRol) => userRol.mnt_role.rol_permissions)
        .flatMap((rolPermission) => rolPermission.ctl_permissions)
        .map((permission) => permission.id);
      const routes = await prisma.mnt_route.findMany({
        where: {
          mnt_route_permissions: {
            some: { id: { in: permissionIds } },
          },
        },
        include: {
          mnt_route_permissions: {
            select: { id: true },
          },
          children: true,
          parent: true,
        },
      });

      const routeMapped = routes.map(
        (route) => {
            const children = route.children.map((child) => {
                return {
                active: child.active,
                description: child.description,
                icon: child.icon,
                name: child.name,
                order: child.order,
                parent: child.id_parent,
                required_auth: child.required_auth,
                show: child.show,
                title: child.title,
                uri: child.uri,
                permissions: child || [],
                children: [],
                id: Number(child.id),
                }
                
            });
            return new Menu<T, P>(
            new MenuActive(route.active),
            children,
            new MenuDescription(route.description ?? ''),
            new MenuIcon(route.icon),
            new MenuName(route.name),
            new MenuOrder(Number(route.order)),
            new MenuParent(route.parent),
            new MenuRequiredAuth(route.required_auth),
            new MenuShow(route.show),
            new MenuTitle(route.title),
            new MenuUri(route.uri),
            new MenuPermissions(route.mnt_route_permissions.map((perm) => perm)),
            new MenuId(Number(route.id)),
          ),
        }
      );
      return routeMapped;

      //   return routes.mnt_user_rol
      //     .flatMap((userRol) => userRol.mnt_role.rol_permissions)
      //     .flatMap((rolPermission) => rolPermission.ctl_permissions)
      //     .flatMap((permission) =>
      //       permission.mnt_route_permissions.map(
      //         (routePermission) => routePermission.mnt_route.uri,
      //       ),
      //     )
      //     .filter((uri, index, self) => uri && self.indexOf(uri) === index);
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
