import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { Route } from '../../domain/entities/route';
import { RouteRepository } from '../../domain/repositories/route-repository';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { RoutesId } from '../../domain/value-objects/routes-value-object/routes-id';

export class ImplRouteRepository implements RouteRepository {
  private routes: Route[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  create(route: Route): Promise<Route> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  update(route: Route): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Route> | Route[]> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  getOneById(id: RoutesId): Promise<Route | null> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
  delete(id: RoutesId): Promise<void> {
    try {
    } catch (error) {
      throw new Error('Method not implemented.');
    }
  }
}
