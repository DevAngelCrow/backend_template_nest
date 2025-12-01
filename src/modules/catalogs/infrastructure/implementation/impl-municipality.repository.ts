import { Injectable } from '@nestjs/common';
import { MunicipalityRespository } from '../../domain/repositories/municipality-repository';
import { Municipality } from '../../domain/entities/municipality';
import { MunicipalityId } from '../../domain/value-objects/municipality-value-object/municipality-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_municipality } from 'generated/prisma/client';

@Injectable()
export class ImplMunicipalityRepository implements MunicipalityRespository {
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
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ municipalities: Municipality[]; total: number }> {
    try {
      const where = {
        name: {
          contains: filter,
        },
      };
      const [municipalitiesDb, total] = await Promise.all([
        this.prisma.ctl_municipality.findMany({
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
        this.prisma.ctl_municipality.count({ where }),
      ]);
      const municipalities = municipalitiesDb.map((municipalityDb) =>
        this.mapToDomain(municipalityDb),
      );
      this.municipalities = municipalities;
      return { municipalities: this.municipalities, total: total };
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
