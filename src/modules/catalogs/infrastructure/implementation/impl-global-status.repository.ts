import { Injectable } from '@nestjs/common';
import { GlobalStatsusRepository } from '../../domain/repositories/global-status-repository';
import { GlobalStatus } from '../../domain/entities/global-status';
import { GlobalStatusId } from '../../domain/value-objects/goblal-status-value-object/global-status-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_status } from 'generated/prisma/client';

@Injectable()
export class ImplGlobalStatusRepository implements GlobalStatsusRepository {
  private globalStatuses: GlobalStatus[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(global_status: GlobalStatus): Promise<void> {
    try {
      await this.prisma.ctl_status.create({
        data: {
          name: global_status.getName().value(),
          description: global_status.getDescription().value(),
          table_header: global_status.getTableHeader().value(),
          state: global_status.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating global status: ${error.message}`);
      }
      throw new DatabaseException('Error creating global status', 'create');
    }
  }
  async update(global_status: GlobalStatus): Promise<void> {
    try {
      await this.prisma.ctl_status.update({
        where: {
          id: global_status.getId()?.value(),
        },
        data: {
          name: global_status.getName().value(),
          description: global_status.getDescription().value(),
          table_header: global_status.getTableHeader().value(),
          state: global_status.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating global status: ${error.message}`);
      }
      throw new DatabaseException('Error updating global status', 'update');
    }
  }
  async getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ globalStatuses: GlobalStatus[]; total: number }> {
    try {
      const where = {
        name: {
          contains: filter,
        },
      };
      const [globalStatusesDb, total] = await Promise.all([
        this.prisma.ctl_status.findMany({
          skip: page && per_page ? (page - 1) * per_page : undefined,
          take: per_page,
          where: {
            name: {
              contains: filter,
            },
          },
          orderBy: {
            id: 'asc',
          },
        }),
        this.prisma.ctl_status.count({ where }),
      ]);
      const globalStatuses = globalStatusesDb.map((globalStatusDb) =>
        this.mapToDomain(globalStatusDb),
      );
      this.globalStatuses = globalStatuses;
      return { globalStatuses: this.globalStatuses, total: total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting global statuses: ${error.message}`);
      }
      throw new DatabaseException('Error getting global statuses', 'getAll');
    }
  }
  async getOneById(id: GlobalStatusId): Promise<GlobalStatus | null> {
    try {
      const globalStatusDb = await this.prisma.ctl_status.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!globalStatusDb) {
        return null;
      }
      const globalStatus = this.mapToDomain(globalStatusDb);
      return globalStatus;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting global status: ${error.message}`);
      }
      throw new DatabaseException('Error getting global status', 'getOneById');
    }
  }
  async delete(id: GlobalStatusId): Promise<void> {
    try {
      const globalStatusDb = await this.prisma.ctl_status.update({
        where: {
          id: id.value(),
        },
        data: {
          state: false,
        },
      });
      if (!globalStatusDb) {
        throw new DatabaseException('GlobalStatus not found', 'delete');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting global status: ${error.message}`);
      }
      throw new DatabaseException('Error deleting global status', 'delete');
    }
  }
  private mapToDomain(prismaGlobalStatus: ctl_status): GlobalStatus {
    return GlobalStatus.create({
      id: Number(prismaGlobalStatus.id),
      name: prismaGlobalStatus.name,
      description: prismaGlobalStatus.description,
      table_header: prismaGlobalStatus.table_header,
      active: prismaGlobalStatus.state,
    });
  }
}
