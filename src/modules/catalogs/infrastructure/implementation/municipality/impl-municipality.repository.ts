import { Injectable } from '@nestjs/common';
import { MunicipalityRespository } from '../../../domain/repositories/municipality-repository';
import { Municipality } from '../../../domain/entities/municipality';
import { MunicipalityId } from '../../../domain/value-objects/municipality-value-object/municipality-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_municipality } from 'generated/prisma/client';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { MunicipalityQueriesRepository } from '@/modules/catalogs/application/repositories/municipality-read.repository';

@Injectable()
export class ImplMunicipalityRepository
  implements MunicipalityRespository, MunicipalityQueriesRepository
{
  private municipalities: Municipality[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(municipality: Municipality): Promise<void> {
    try {
      await this.prisma.ctl_municipality.create({
        data: {
          name: municipality.getName().value(),
          description: municipality.getDescription().value(),
          id_department: municipality.getIdDepartment().value(),
          active: municipality.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating municipality: ${error.message}`);
      }
      throw new DatabaseException('Error creating municipality', 'create');
    }
  }
  async update(municipality: Municipality): Promise<void> {
    try {
      await this.prisma.ctl_municipality.update({
        where: {
          id: municipality.getId()?.value(),
        },
        data: {
          name: municipality.getName().value(),
          description: municipality.getDescription().value(),
          id_department: municipality.getIdDepartment().value(),
          active: municipality.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating municipality: ${error.message}`);
      }
      throw new DatabaseException('Error updating municipality', 'update');
    }
  }
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Municipality> | Municipality[]> {
    try {
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [municipalitiesDb, total] = await Promise.all([
        this.prisma.ctl_municipality.findMany({
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
        this.prisma.ctl_municipality.count({ where }),
      ]);

      const municipalities = municipalitiesDb.map((municipalityDb) =>
        this.mapToDomain(municipalityDb),
      );

      this.municipalities = municipalities;

      if (!pagination_params) {
        return municipalities;
      }

      const entityList: EntityList<Municipality> =
        municipalities.length > 0
          ? new EntityList<Municipality>(municipalities)
          : new EntityList<Municipality>([]);

      return new Pagination<Municipality>(
        entityList,
        pagination_params.getPage(),
        pagination_params.getPerPage(),
        new TotalItems(total),
        new TotalPages(
          Math.ceil(total / pagination_params.getPerPage().value()),
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting municipalities: ${error.message}`);
      }
      throw new DatabaseException('Error getting municipalities', 'getAll');
    }
  }
  async getOneById(id: MunicipalityId): Promise<Municipality | null> {
    try {
      const municipalityDb = await this.prisma.ctl_municipality.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!municipalityDb) {
        return null;
      }
      const municipality = this.mapToDomain(municipalityDb);
      return municipality;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting municipality: ${error.message}`);
      }
      throw new DatabaseException('Error getting municipality', 'getOneById');
    }
  }
  async delete(id: MunicipalityId): Promise<void> {
    try {
      const municipalityDb = await this.prisma.ctl_municipality.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!municipalityDb) {
        throw new DatabaseException('Municipality not found', 'delete');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting municipality: ${error.message}`);
      }
      throw new DatabaseException('Error deleting municipality', 'delete');
    }
  }
  private mapToDomain(prismaMunicipality: ctl_municipality): Municipality {
    return Municipality.create({
      id: Number(prismaMunicipality.id),
      name: prismaMunicipality.name,
      description: prismaMunicipality.description,
      id_department: Number(prismaMunicipality.id_department),
      active: prismaMunicipality.active,
    });
  }
}
