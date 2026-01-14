import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissions } from '../../domain/entities/category-permissions';
import { CategoryPermissionsRepository } from '../../domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '../../domain/value-objects/category-permissions-value-object/category-permissions-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { Injectable } from '@nestjs/common';
import { ctl_category_permissions } from 'generated/prisma/client';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

@Injectable()
export class ImplCategoryPermissionsRepository implements CategoryPermissionsRepository {
  private categoryPermissions: CategoryPermissions[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(category_permissions: CategoryPermissions): Promise<void> {
    try {
      await this.prisma.ctl_category_permissions.create({
        data: {
          name: category_permissions.getName().value(),
          description: category_permissions.getDescription().value(),
          active: category_permissions.getActive().value(),
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
  async update(category_permissions: CategoryPermissions): Promise<void> {
    try {
      await this.prisma.ctl_category_permissions.update({
        where: {
          id: category_permissions.getId()?.value(),
        },
        data: {
          name: category_permissions.getName().value(),
          description: category_permissions.getDescription().value(),
          active: category_permissions.getActive().value(),
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
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]> {
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
      if (error instanceof Error) {
        throw new Error(`Error getting countries: ${error.message}`);
      }
      throw new DatabaseException('Error getting countries', 'getAll');
    }
  }
  async getOneById(
    id: CategoryPermissionsId,
  ): Promise<CategoryPermissions | null> {
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
  async delete(id: CategoryPermissionsId): Promise<void> {
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
  private mapToDomain(
    prismaCategoryPermissions: ctl_category_permissions,
  ): CategoryPermissions {
    return CategoryPermissions.create({
      id: Number(prismaCategoryPermissions.id),
      name: prismaCategoryPermissions.name,
      description: prismaCategoryPermissions.description,
      active: prismaCategoryPermissions.active,
    });
  }
}
