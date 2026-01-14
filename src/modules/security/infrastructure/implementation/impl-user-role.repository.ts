import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { UserRoleAggregate } from '../../domain/aggregates/user-role.aggregate';
import { UserRoleRepository } from '../../domain/repositories/user-rol-repository';
import { UserRoleIdUser } from '../../domain/value-objects/user-role-value-object/user-role-id-user';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImplUserRoleRepository implements UserRoleRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}
  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(user_role: UserRoleAggregate): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      await prisma.mnt_user_rol.createMany({
        data: user_role.getIdRole().map((rol) => ({
          id_user: user_role.getIdUser().value(),
          id_role: Number(rol.value()),
          created_at: new Date(),
        })),
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Database error: ${error.message}`);
      }
      throw new DatabaseException('Error creating user_rol', 'create');
    }
  }
  updateOrCreate(user_role: UserRoleAggregate): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAllByUserId(user_id: UserRoleIdUser): Promise<UserRoleAggregate[]> {
    throw new Error('Method not implemented.');
  }
  getAll(
    pagination_params?: PaginationParams,
  ): Promise<Pagination<UserRoleAggregate> | UserRoleAggregate[]> {
    throw new Error('Method not implemented.');
  }
}
