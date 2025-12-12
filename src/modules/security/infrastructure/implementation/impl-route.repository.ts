import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { Route } from '../../domain/entities/route';
import { RouteRepository } from '../../domain/repositories/route-repository';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { RoutesId } from '../../domain/value-objects/routes-value-object/routes-id';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { mnt_route } from 'generated/prisma/client';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class ImplRouteRepository implements RouteRepository {
  private routes: Route[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(route: Route): Promise<Route> {
    try {
      const prisma = this.getPrismaClient();
      const routeDb = await prisma.mnt_route.create({
        data: {
          name: route.getName().value(),
          description: route.getDescription().value(),
          active: route.getActive().value(),
          icon: route.getIcon().value(),
          uri: route.getUri().value(),
          show: route.getShow().value(),
          order: route.getOrder().value(),
          required_auth: true, // route?.getRequiredAuth()?.value(),
          title: '', // route?.getTitle()?.value(),
          id_parent: 1, // route?.getIdParent()?.value() || null,
          created_at: new Date(),
        },
      });
      const routeEntity = Route.create({
        name: routeDb.name,
        description: routeDb.description || '',
        active: routeDb.active,
        icon: routeDb.icon,
        uri: routeDb.uri,
        show: routeDb.show,
        order: routeDb.order || 1,
        required_auth: routeDb.required_auth,
        title: routeDb.title,
        id_parent: Number(routeDb.id_parent) || 1,
        id: Number(routeDb.id),
      });
      return routeEntity;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error creating category permissions: ${error.message}`,
        );
      }
      throw new DatabaseException(
        'Error creating category permissions',
        'create',
      );
    }
  }
  async update(route: Route): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      await prisma.mnt_route.update({
        where: {
          id: route.getId()?.value(),
        },
        data: {
          name: route.getName().value(),
          description: route.getDescription().value(),
          active: route.getActive().value(),
          icon: route.getIcon().value(),
          uri: route.getUri().value(),
          show: route.getShow().value(),
          order: route.getOrder().value(),
          required_auth: route.getRequiredAuth().value(),
          title: route.getTitle()?.value() || '',
          id_parent: route.getIdParent()?.value() || null,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error updating category permissions: ${error.message}`,
        );
      }
      throw new DatabaseException(
        'Error updating category permissions',
        'update',
      );
    }
  }
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Route> | Route[]> {
    try {
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [categoryPermissionsDb, total] = await Promise.all([
        this.prisma.ctl_category_permissions.findMany({
          skip:
            pagination_params?.getPage().value() &&
            pagination_params?.getPerPage().value()
              ? (pagination_params.getPage().value() - 1) *
                pagination_params.getPerPage().value()
              : undefined,
          take: pagination_params?.getPerPage().value(),
          where,
          orderBy: {
            id: 'asc',
          },
        }),
        this.prisma.ctl_category_permissions.count({ where }),
      ]);

      const categoryPermissions =
        categoryPermissionsDb.length > 0
          ? categoryPermissionsDb.map(
              (categoryPermissionsDb: ctl_category_permissions) =>
                this.mapToDomain(categoryPermissionsDb),
            )
          : [];

      this.categoryPermissions = categoryPermissions;

      if (!pagination_params) {
        return this.categoryPermissions;
      }

      const entityList: EntityList<CategoryPermissions> =
        categoryPermissions.length > 0
          ? new EntityList<CategoryPermissions>(this.categoryPermissions)
          : new EntityList<CategoryPermissions>([]);

      return new Pagination<CategoryPermissions>(
        entityList,
        pagination_params.getPage(),
        pagination_params.getPerPage(),
        new TotalItems(Number(total)),
        new TotalPages(
          Math.ceil(total / pagination_params.getPerPage().value()),
        ),
      );
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  async getOneById(id: RoutesId): Promise<Route | null> {
    try {
      const categoryPermissionDb: ctl_category_permissions | null =
        await this.prisma.ctl_category_permissions.findFirst({
          where: {
            id: id.value(),
          },
        });
      if (!categoryPermissionDb) {
        return null;
      }
      const categoryPermission = this.mapToDomain(categoryPermissionDb);
      return categoryPermission;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating category permission: ${error.message}`);
      }
      throw new NotFoundException('CategoryPermission', id.value().toString());
    }
  }
  async delete(id: RoutesId): Promise<void> {
    try {
      const categoryPermissionDb =
        await this.prisma.ctl_category_permissions.update({
          where: {
            id: id.value(),
          },
          data: {
            active: false,
          },
        });
      if (!categoryPermissionDb) {
        throw new NotFoundException(
          'CategoryPermission',
          id.value().toString(),
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating category permission: ${error.message}`);
      }
      throw new DatabaseException(
        'Error deleting category permission',
        'delete',
      );
    }
  }
  private mapToDomain(primsaRoute: mnt_route): Route {
    return Route.create({
      id: Number(primsaRoute.id),
      name: primsaRoute.name,
      description: primsaRoute.description,
      icon: primsaRoute.icon,
      uri: primsaRoute.uri,
      active: primsaRoute.active,
      show: primsaRoute.show,
      order: primsaRoute.order || 1,
      required_auth: primsaRoute.required_auth,
      title: primsaRoute.title,
      id_parent: Number(primsaRoute.id_parent) || 1,
    });
  }
}
