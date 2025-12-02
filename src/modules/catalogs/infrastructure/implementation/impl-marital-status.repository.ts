import { Injectable } from '@nestjs/common';
import { MaritalStatusRepository } from '../../domain/repositories/marital-status-repository';
import { MaritalStatus } from '../../domain/entities/marital-status';
import { MaritalStatusId } from '../../domain/value-objects/marital-status-value-object/marital-status-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_marital_status } from 'generated/prisma/client';

@Injectable()
export class ImplMaritalStatusRepository implements MaritalStatusRepository {
  private maritalStatuses: MaritalStatus[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(marital_status: MaritalStatus): Promise<void> {
    try {
      await this.prisma.ctl_marital_status.create({
        data: {
          name: marital_status.getName().value(),
          description: marital_status.getDescription()?.value() || '',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating marital status: ${error.message}`);
      }
      throw new DatabaseException('Error creating marital status', 'create');
    }
  }
  async update(marital_status: MaritalStatus): Promise<void> {
    try {
      await this.prisma.ctl_marital_status.update({
        where: {
          id: marital_status.getId()?.value(),
        },
        data: {
          name: marital_status.getName().value(),
          description: marital_status.getDescription()?.value() || '',
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating marital status: ${error.message}`);
      }
      throw new DatabaseException('Error updating marital status', 'update');
    }
  }
  async getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ maritalStatuses: MaritalStatus[]; total: number }> {
    try {
      const where = {
        name: {
          contains: filter,
        },
      };
      const [maritalStatusesDb, total] = await Promise.all([
        this.prisma.ctl_marital_status.findMany({
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
        this.prisma.ctl_marital_status.count({ where }),
      ]);
      const maritalStatuses = maritalStatusesDb.map((maritalStatusDb) =>
        this.mapToDomain(maritalStatusDb),
      );
      this.maritalStatuses = maritalStatuses;
      return { maritalStatuses: this.maritalStatuses, total: total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting marital statuses: ${error.message}`);
      }
      throw new DatabaseException('Error getting marital statuses', 'getAll');
    }
  }
  async getOneById(id: MaritalStatusId): Promise<MaritalStatus | null> {
    try {
      const maritalStatusDb = await this.prisma.ctl_marital_status.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!maritalStatusDb) {
        return null;
      }
      const maritalStatus = this.mapToDomain(maritalStatusDb);
      return maritalStatus;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting marital status: ${error.message}`);
      }
      throw new DatabaseException('Error getting marital status', 'getOneById');
    }
  }
  async delete(id: MaritalStatusId): Promise<void> {
    try {
      const maritalStatusDb = await this.prisma.ctl_marital_status.delete({
        where: {
          id: id.value(),
        },
      });
      if (!maritalStatusDb) {
        throw new DatabaseException('MaritalStatus not found', 'delete');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting marital status: ${error.message}`);
      }
      throw new DatabaseException('Error deleting marital status', 'delete');
    }
  }
  private mapToDomain(prismaMaritalStatus: ctl_marital_status): MaritalStatus {
    return MaritalStatus.create({
      id: Number(prismaMaritalStatus.id),
      name: prismaMaritalStatus.name,
      description: prismaMaritalStatus.description,
    });
  }
}
