import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { Person } from '../../domain/entities/person';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { PersonEmail } from '../../domain/value-objects/person-value-object/person-email';
import { PersonId } from '../../domain/value-objects/person-value-object/person-id';
import { Injectable } from '@nestjs/common';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { mnt_people } from 'generated/prisma/browser';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { mnt_peopleWhereInput } from 'generated/prisma/models';

@Injectable()
export class ImplPersonRepository implements PersonRepository {
  private persons: Person[] = [];
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}

  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Person> | Person[]> {
    try {
      const where: mnt_peopleWhereInput | undefined = filter
        ? {
            OR: [
              {
                first_name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
              {
                last_name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
              {
                middle_name: {
                  contains: filter,
                  mode: 'insensitive',
                },
              },
            ],
          }
        : undefined;
      const prisma = this.getPrismaClient();
      const [personsDb, total] = await Promise.all([
        prisma.mnt_people.findMany({
          skip:
            pagination_params?.getPage().value() &&
            pagination_params?.getPerPage().value()
              ? (pagination_params.getPage().value() - 1) *
                pagination_params.getPerPage().value()
              : undefined,
          take: pagination_params?.getPerPage().value(),
          where,
          include: {
            people_country: {
              orderBy: {
                id: 'asc',
              },
              include: {
                ctl_country: true,
              },
            },
          },
          orderBy: {
            id: 'asc',
          },
        }),
        prisma.mnt_people.count({ where }),
      ]);
      const persons = personsDb.map((personDb: mnt_people) =>
        this.mapToDomain(personDb),
      );
      this.persons = persons;
      if (!pagination_params) {
        return this.persons;
      }
      const entityList: EntityList<Person> =
        persons.length > 0
          ? new EntityList<Person>(this.persons)
          : new EntityList<Person>([]);
      return new Pagination<Person>(
        entityList,
        pagination_params.getPage(),
        pagination_params.getPerPage(),
        new TotalItems(Number(total)),
        new TotalPages(
          Math.ceil(total / pagination_params.getPerPage().value()),
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting persons: ${error.message}`);
      }
      throw new DatabaseException('Error getting persons', 'getAll');
    }
  }
  async create(
    person: Person,
    nationalities: number[],
  ): Promise<Person | void> {
    try {
      const prisma = this.getPrismaClient();
      const personDb = await prisma.mnt_people.create({
        data: {
          first_name: person.getFirstName().value(),
          last_name: person.getLastName().value(),
          email: person.getEmail().value(),
          phone: person.getPhone().value(),
          birthdate: new Date(person.getBirthdate().value()),
          id_gender: person.getIdGender().value(),
          id_marital_status: person.getIdMaritalStatus().value(),
          id_status: person.getIdStatus().value(),
          middle_name: person.getMiddleName()?.value() ?? '',
          img_path: person.getImgPath()?.value(),
          people_country: {
            createMany: {
              data: nationalities.map((nation) => ({ id_country: nation })),
            },
          },
        },
      });
      const personCreatedEntity = this.mapToDomain(personDb);
      return personCreatedEntity;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating person: ${error.message}`);
      }
      throw new DatabaseException('Error creating person', 'create');
    }
  }
  async update(person: Person, nationalities: number[]): Promise<void> {
    try {
      const prisma = this.getPrismaClient();
      await prisma.mnt_people.update({
        where: {
          id: person.getId()?.value(),
        },
        data: {
          first_name: person.getFirstName().value(),
          last_name: person.getLastName().value(),
          email: person.getEmail().value(),
          phone: person.getPhone().value(),
          birthdate: new Date(person.getBirthdate().value()),
          id_gender: person.getIdGender().value(),
          id_marital_status: person.getIdMaritalStatus().value(),
          id_status: person.getIdStatus().value(),
          middle_name: person.getMiddleName()?.value() ?? '',
          img_path: person.getImgPath()?.value() ?? '',
          people_country: {
            deleteMany: {},
            createMany: {
              data: nationalities.map((nation) => ({ id_country: nation })),
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new DatabaseException('Error creating country', 'update');
    }
  }

  async getOneById(id: PersonId): Promise<Person | null> {
    try {
      const prisma = this.getPrismaClient();
      const personDb = await prisma.mnt_people.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!personDb) {
        return null;
      }
      const person = this.mapToDomain(personDb);
      return person;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting person by ID: ${error.message}`);
      }
      throw new DatabaseException('Error getting person by ID', 'getOneById');
    }
  }
  async getOneByEmail(email: PersonEmail): Promise<Person | null> {
    try {
      const prisma = this.getPrismaClient();
      const personDb = await prisma.mnt_people.findFirst({
        where: {
          email: email.value(),
        },
      });
      if (!personDb) {
        return null;
      }
      const person = this.mapToDomain(personDb);
      return person;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting person by Email: ${error.message}`);
      }
      throw new DatabaseException(
        'Error getting person by Email',
        'getOneByEmail',
      );
    }
  }
  // delete(id: PersonId): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
  private mapToDomain(prismaPerson: mnt_people): Person {
    return Person.create({
      first_name: prismaPerson.first_name,
      birthdate: prismaPerson.birthdate,
      id_gender: Number(prismaPerson.id_gender),
      email: prismaPerson.email,
      id_marital_status: Number(prismaPerson.id_marital_status),
      phone: prismaPerson.phone,
      id_status: Number(prismaPerson.id_status),
      middle_name: prismaPerson.middle_name,
      last_name: prismaPerson.last_name,
      img_path: prismaPerson.img_path,
      id: Number(prismaPerson.id),
    });
  }
}
