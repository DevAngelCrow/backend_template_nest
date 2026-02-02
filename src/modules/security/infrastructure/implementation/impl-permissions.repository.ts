import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { PermissionsRepository } from '../../domain/repositories/permissions-repository';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Permissions } from '../../domain/entities/permissions';
import { PermissionsId } from '../../domain/value-objects/permissions-value-object/permissions-id';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { ctl_permissions } from 'generated/prisma/client';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { PermissionsReadRepository } from '../../application/repositories/permissions-read.repository';

@Injectable()
export class ImplPermissionsRepository
  implements PermissionsRepository, PermissionsReadRepository
{
  private permissions: Permissions[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(permission: Permissions): Promise<void> {
    try {
      await this.prisma.ctl_permissions.create({
        data: {
          name: permission.getName().value(),
          description: permission.getDescription().value(),
          active: permission.getActive().value(),
          id_category_permissions: permission
            .getIdCategoryPermissions()
            .value(),
          created_at: new Date(),
        },
      });
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
  async update(permission: Permissions): Promise<void> {
    try {
      await this.prisma.ctl_permissions.update({
        where: {
          id: permission.getId()?.value(),
        },
        data: {
          name: permission.getName().value(),
          description: permission.getDescription().value(),
          active: permission.getActive().value(),
          updated_at: new Date(),
        },
      });
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
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Permissions> | Permissions[]> {
    try {
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [permissionsDb, total] = await Promise.all([
        this.prisma.ctl_permissions.findMany({
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
        this.prisma.ctl_permissions.count({ where }),
      ]);

      const permissions =
        permissionsDb.length > 0
          ? permissionsDb.map((permissionsDb: ctl_permissions) =>
              this.mapToDomain(permissionsDb),
            )
          : [];

      this.permissions = permissions;
      if (!pagination_params) {
        return this.permissions;
      }

      const entityList: EntityList<Permissions> =
        permissions.length > 0
          ? new EntityList<Permissions>(this.permissions)
          : new EntityList<Permissions>([]);

      return new Pagination<Permissions>(
        entityList,
        pagination_params.getPage(),
        pagination_params.getPerPage(),
        new TotalItems(Number(total)),
        new TotalPages(
          Math.ceil(total / pagination_params.getPerPage().value()),
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting countries: ${error.message}`);
      }
      throw new DatabaseException('Error getting countries', 'getAll');
    }
  }
  async getOneById(id: PermissionsId): Promise<Permissions | null> {
    try {
      const permissionsDb: ctl_permissions | null =
        await this.prisma.ctl_permissions.findFirst({
          where: {
            id: id.value(),
          },
        });
      if (!permissionsDb) {
        return null;
      }
      const permissions = this.mapToDomain(permissionsDb);
      return permissions;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting countries: ${error.message}`);
      }
      throw new DatabaseException('Error getting countries', 'getAll');
    }
  }
  async delete(id: PermissionsId): Promise<void> {
    try {
      const permissionsDb = await this.prisma.ctl_permissions.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!permissionsDb) {
        throw new NotFoundException('Permissions', id.value().toString());
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
  private mapToDomain(prismaPermissions: ctl_permissions): Permissions {
    return Permissions.create({
      id: Number(prismaPermissions.id),
      name: prismaPermissions.name,
      description: prismaPermissions.description,
      active: prismaPermissions.active,
      id_category_permissions: Number(
        prismaPermissions.id_category_permissions,
      ),
    });
  }
}
