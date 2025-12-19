import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { SecurityAuthorizationPort } from '../../domain/ports/security-authorization.port';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Menu } from '../../domain/entities/menu';
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
import {
  Menu as MenuInterface,
  Permission,
} from '../interfaces/menu.interface';
import { Injectable } from '@nestjs/common';
@Injectable()
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
        return false;
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
        return false;
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
  async filterRoutesForUser<T = MenuInterface, P = Permission>(
    id_user: number,
  ): Promise<Menu<T, P>[]> {
    try {
      const prisma = this.getPrismaClient();

      // 1. Obtener IDs de permisos del usuario
      const user = await prisma.mnt_user.findFirst({
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
        return [];
      }

      const permissionIds = user.mnt_user_rol
        .flatMap((userRol) => userRol.mnt_role.rol_permissions)
        .flatMap((rolPermission) => rolPermission.ctl_permissions)
        .map((permission) => Number(permission.id));

      // 2. Obtener rutas que tienen permisos que el usuario posee
      const routes = await prisma.mnt_route.findMany({
        where: {
          mnt_route_permissions: {
            some: {
              id_permission: { in: permissionIds },
            },
          },
        },
        include: {
          children: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              uri: true,
              active: true,
              id_parent: true,
              order: true,
              required_auth: true,
              show: true,
              title: true,
            },
          },
          parent: {
            select: {
              id: true,
              name: true,
              description: true,
              icon: true,
              uri: true,
              active: true,
              order: true,
              required_auth: true,
              show: true,
              title: true,
            },
          },
          mnt_route_permissions: {
            include: {
              ctl_permissions: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  id_category_permissions: true,
                  active: true,
                },
              },
            },
          },
        },
      });

      // 3. Eliminar duplicados (equivalente a ->unique('id')->values() en Laravel)
      const uniqueRoutes = Array.from(
        new Map(routes.map((route) => [Number(route.id), route])).values(),
      );

      // 4. Mapear a entidades de dominio
      const routeMapped = uniqueRoutes.map((route) => {
        // Mapear children
        const children = route.children.map(
          (child) =>
            new MenuChildren<T>({
              active: child.active,
              description: child.description ?? '',
              icon: child.icon,
              name: child.name,
              order: Number(child.order),
              required_auth: child.required_auth,
              show: child.show,
              title: child.title,
              uri: child.uri,
              id: Number(child.id),
            } as T),
        );

        // Mapear permissions
        const permissions = route.mnt_route_permissions.map(
          (rp) =>
            new MenuPermissions<P>({
              id: Number(rp.ctl_permissions.id),
              name: rp.ctl_permissions.name,
              description: rp.ctl_permissions.description,
              id_category_permissions: Number(
                rp.ctl_permissions.id_category_permissions,
              ),
              active: rp.ctl_permissions.active,
            } as P),
        );

        const parentData = route.parent
          ? {
              ...route.parent,
              id: Number(route.parent.id),
              order: Number(route.parent.order),
            }
          : null;
        return new Menu<T, P>(
          new MenuActive(route.active),
          children,
          permissions,
          new MenuDescription(route.description ?? ''),
          new MenuIcon(route.icon),
          new MenuName(route.name),
          new MenuOrder(Number(route.order)),
          new MenuParent<T>(parentData as T),
          new MenuRequiredAuth(route.required_auth),
          new MenuShow(route.show),
          new MenuTitle(route.title),
          new MenuUri(route.uri),
          new MenuId(Number(route.id)),
        );
      });

      return routeMapped;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
