import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { Rol } from '../../domain/entities/rol';
import { RolRepository } from '../../domain/repositories/rol-repository';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';

export class ImplRolRepository implements RolRepository {
  private role: Rol[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  create(rol: Rol): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  update(rol: Rol): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Rol> | Rol[]> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getOneById(id: string): Promise<Rol | null> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  delete(id: string): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
