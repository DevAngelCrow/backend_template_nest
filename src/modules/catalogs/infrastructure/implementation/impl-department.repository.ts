import { Injectable } from '@nestjs/common';
import { DepartmentRepository } from '../../domain/repositories/department-repository';
import { Department } from '../../domain/entities/department';
import { DepartmentId } from '../../domain/value-objects/department-value-object/department-id';
import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { ctl_department } from 'generated/prisma/client';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';

@Injectable()
export class ImplDepartmentRepository implements DepartmentRepository {
  private departments: Department[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(department: Department): Promise<void> {
    try {
      await this.prisma.ctl_department.create({
        data: {
          name: department.getName().value(),
          description: department.getDescription().value(),
          id_country: department.getIdCountry().value(),
          active: department.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating department: ${error.message}`);
      }
      throw new DatabaseException('Error creating department', 'create');
    }
  }
  async update(department: Department): Promise<void> {
    try {
      await this.prisma.ctl_department.update({
        where: {
          id: department.getId()?.value(),
        },
        data: {
          name: department.getName().value(),
          description: department.getDescription().value(),
          id_country: department.getIdCountry().value(),
          active: department.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating department: ${error.message}`);
      }
      throw new DatabaseException('Error updating department', 'update');
    }
  }
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Department> | Department[]> {
    try {
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [departmentsDb, total] = await Promise.all([
        this.prisma.ctl_department.findMany({
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
        this.prisma.ctl_department.count({ where }),
      ]);

      const departments = departmentsDb.map((departmentDb) =>
        this.mapToDomain(departmentDb),
      );

      this.departments = departments;

      if (!pagination_params) {
        return departments;
      }

      const entityList: EntityList<Department> =
        departments.length > 0
          ? new EntityList<Department>(departments)
          : new EntityList<Department>([]);

      return new Pagination<Department>(
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
        throw new Error(`Error getting departments: ${error.message}`);
      }
      throw new DatabaseException('Error getting departments', 'getAll');
    }
  }
  async getOneById(id: DepartmentId): Promise<Department | null> {
    try {
      const departmentDb = await this.prisma.ctl_department.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!departmentDb) {
        return null;
      }
      const department = this.mapToDomain(departmentDb);
      return department;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting department: ${error.message}`);
      }
      throw new DatabaseException('Error getting department', 'getOneById');
    }
  }
  async delete(id: DepartmentId): Promise<void> {
    try {
      const departmentDb = await this.prisma.ctl_department.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!departmentDb) {
        throw new DatabaseException('Department not found', 'delete');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting department: ${error.message}`);
      }
      throw new DatabaseException('Error deleting department', 'delete');
    }
  }
  private mapToDomain(prismaDepartment: ctl_department): Department {
    return Department.create({
      id: Number(prismaDepartment.id),
      name: prismaDepartment.name,
      description: prismaDepartment.description,
      id_country: Number(prismaDepartment.id_country),
      active: prismaDepartment.active,
    });
  }
}
