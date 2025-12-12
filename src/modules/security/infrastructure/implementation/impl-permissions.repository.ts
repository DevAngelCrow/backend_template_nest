import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { PermissionsRepository } from '../../domain/repositories/permissions-repository';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Permissions } from '../../domain/entities/permissions';
import { PermissionsId } from '../../domain/value-objects/permissions-value-object/permissions-id';

export class ImplPermissionsRepository implements PermissionsRepository {
  private permissions: Permissions[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  create(permission: Permissions): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  update(permission: Permissions): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Permissions> | Permissions[]> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getOneById(id: PermissionsId): Promise<Permissions | null> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  delete(id: PermissionsId): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
