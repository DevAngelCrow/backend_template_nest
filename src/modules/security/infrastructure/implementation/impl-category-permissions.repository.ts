import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { CategoryPermissions } from '../../domain/entities/category-permissions';
import { CategoryPermissionsRepository } from '../../domain/repositories/category-permissions-repository';
import { CategoryPermissionsId } from '../../domain/value-objects/category-permissions-value-object/category-permissions-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';

export class ImplCategoryPermissionsRepository implements CategoryPermissionsRepository {
  private categoryPermissions: CategoryPermissions[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  create(category_permissions: CategoryPermissions): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  update(category_permissions: CategoryPermissions): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<CategoryPermissions> | CategoryPermissions[]> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getOneById(id: CategoryPermissionsId): Promise<CategoryPermissions | null> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  delete(id: CategoryPermissionsId): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
