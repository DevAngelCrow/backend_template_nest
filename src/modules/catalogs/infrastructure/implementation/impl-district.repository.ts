import { Injectable } from '@nestjs/common';
import { DistrictRepository } from '../../domain/repositories/district-repository';
import { District } from '../../domain/entities/district';
import { DistrictId } from '../../domain/value-objects/district-value-object/district-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_district } from 'generated/prisma/client';

@Injectable()
export class ImplDistrictRepository implements DistrictRepository {
  private districts: District[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(district: District): Promise<void> {
    try {
      await this.prisma.ctl_district.create({
        data: {
          name: district.getName().value(),
          description: district.getDescription().value(),
          id_municipality: district.getIdMunicipality().value(),
          active: district.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating district: ${error.message}`);
      }
      throw new DatabaseException('Error creating district', 'create');
    }
  }
  async update(district: District): Promise<void> {
    try {
      await this.prisma.ctl_district.update({
        where: {
          id: district.getId()?.value(),
        },
        data: {
          name: district.getName().value(),
          description: district.getDescription().value(),
          id_municipality: district.getIdMunicipality().value(),
          active: district.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating district: ${error.message}`);
      }
      throw new DatabaseException('Error updating district', 'update');
    }
  }
  async getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ districts: District[]; total: number }> {
    try {
      const where = {
        name: {
          contains: filter,
        },
      };
      const [districtsDb, total] = await Promise.all([
        this.prisma.ctl_district.findMany({
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
        this.prisma.ctl_district.count({ where }),
      ]);
      const districts = districtsDb.map((districtDb) =>
        this.mapToDomain(districtDb),
      );
      this.districts = districts;
      return { districts: this.districts, total: total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting districts: ${error.message}`);
      }
      throw new DatabaseException('Error getting districts', 'getAll');
    }
  }
  async getOneById(id: DistrictId): Promise<District | null> {
    try {
      const districtDb = await this.prisma.ctl_district.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!districtDb) {
        return null;
      }
      const district = this.mapToDomain(districtDb);
      return district;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting district: ${error.message}`);
      }
      throw new DatabaseException('Error getting district', 'getOneById');
    }
  }
  async delete(id: DistrictId): Promise<void> {
    try {
      const districtDb = await this.prisma.ctl_district.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!districtDb) {
        throw new DatabaseException('District not found', 'delete');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting district: ${error.message}`);
      }
      throw new DatabaseException('Error deleting district', 'delete');
    }
  }
  private mapToDomain(prismaDistrict: ctl_district): District {
    return District.create({
      id: Number(prismaDistrict.id),
      name: prismaDistrict.name,
      description: prismaDistrict.description,
      id_municipality: Number(prismaDistrict.id_municipality),
      active: prismaDistrict.active,
    });
  }
}
