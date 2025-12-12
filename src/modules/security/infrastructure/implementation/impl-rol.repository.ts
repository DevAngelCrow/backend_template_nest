import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Rol } from '../../domain/entities/rol';
import { RolRepository } from '../../domain/repositories/rol-repository';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { mnt_role } from 'generated/prisma/browser';
import { RolId } from '../../domain/value-objects/rol-value-object/rol-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class ImplRolRepository implements RolRepository {
  private role: Rol[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(rol: Rol): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      await prisma.mnt_role.create({
        data: {
          name: rol.getName().value(),
          description: rol.getDescription().value(),
          id_status: rol.getIdStatus().value(),
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
  async update(rol: Rol): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      await prisma.mnt_role.update({
        where: {
          id: rol.getId()?.value(),
        },
        data: {
          name: rol.getName().value(),
          description: rol.getDescription().value(),
          id_status: rol.getIdStatus().value(),
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
  ): Promise<Pagination<Rol> | Rol[]> {
    try {
      const prisma = this.getPrismaClient();
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [roleDb, total] = await Promise.all([
        prisma.mnt_role.findMany({
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
        prisma.mnt_role.count({ where }),
      ]);

      const roles =
        roleDb.length > 0
          ? roleDb.map((roleDb: mnt_role) => this.mapToDomain(roleDb))
          : [];

      this.role = roles;
      if (!pagination_params) {
        return this.role;
      }

      const entityList: EntityList<Rol> =
        roles.length > 0
          ? new EntityList<Rol>(this.role)
          : new EntityList<Rol>([]);

      return new Pagination<Rol>(
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
        throw new Error(`Error getting roles: ${error.message}`);
      }
      throw new DatabaseException('Error getting roles', 'getAll');
    }
  }
  async getOneById(id: RolId): Promise<Rol | null> {
    try {
      const prisma = this.getPrismaClient();
      const roleDb: mnt_role | null = await prisma.mnt_role.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!roleDb) {
        return null;
      }
      const role = this.mapToDomain(roleDb);
      return role;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating role: ${error.message}`);
      }
      throw new NotFoundException('Role', id.value().toString());
    }
  }
  async delete(id: RolId): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      const roleDb = await prisma.mnt_role.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!roleDb) {
        throw new NotFoundException('Role', id.value().toString());
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting role: ${error.message}`);
      }
      throw new DatabaseException('Error deleting role', 'delete');
    }
  }
  private mapToDomain(prismaRole: mnt_role): Rol {
    return Rol.create({
      id: Number(prismaRole.id),
      name: prismaRole.name,
      description: prismaRole.description,
      id_status: Number(prismaRole.id_status),
    });
  }
}
