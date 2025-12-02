import { PrismaService } from '@/shared/infrastructure/persistence/prisma/prisma.service';
import { Person } from '../../domain/entities/person';
import { PersonRepository } from '../../domain/repositories/person.repository';
import { PersonEmail } from '../../domain/value-objects/person-value-object/person-email';
import { PersonId } from '../../domain/value-objects/person-value-object/person-id';
import { Injectable } from '@nestjs/common';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { mnt_people } from 'generated/prisma/browser';

@Injectable()
export class ImplPersonRepository implements PersonRepository {
  private persons: Person[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(
    person: Person,
    nationalities: number[],
  ): Promise<Person | void> {
    try {
      await this.prisma.mnt_people.create({
        data: {
          first_name: person.getFirstName().value(),
          last_name: person.getLastName().value(),
          email: person.getEmail().value(),
          phone: person.getPhone().value(),
          birthdate: new Date(person.getBirthdate().value()),
          id_gender: person.getIdGender().value(),
          id_marital_status: person.getIdMaritalStatus().value(),
          id_status: person.getIdStatus().value(),
          middle_name: person.getMiddleName()?.value() || '',
          img_path: person.getImgPath()?.value(),
          people_country: {
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
      throw new DatabaseException('Error creating country', 'create');
    }
  }
  async update(person: Person, nationalities: number[]): Promise<void> {
    try {
      await this.prisma.mnt_people.update({
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
          middle_name: person.getMiddleName()?.value() || '',
          img_path: person.getImgPath()?.value(),
          people_country: {
            updateMany: {
              where: { id: person.getId()?.value() },
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
  async getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ people: Person[]; total: number }> {
    try {
      const where = {
        first_name: {
          contains: filter,
        },
      };
      const [personsDb, total] = await Promise.all([
        this.prisma.mnt_people.findMany({
          skip: page && per_page ? (page - 1) * per_page : undefined,
          take: per_page,
          where: {
            first_name: {
              contains: filter,
            },
          },
          orderBy: {
            id: 'asc',
          },
        }),
        this.prisma.mnt_people.count({ where }),
      ]);
      const persons = personsDb.map((personDb) => this.mapToDomain(personDb));
      this.persons = persons;
      return { people: this.persons, total: total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting persons: ${error.message}`);
      }
      throw new DatabaseException('Error getting persons', 'getAll');
    }
  }
  async getOneById(id: PersonId): Promise<Person | null> {
    try {
      const personDb = await this.prisma.mnt_people.findFirst({
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
      const personDb = await this.prisma.mnt_people.findFirst({
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
  delete(id: PersonId): Promise<void> {
    throw new Error('Method not implemented.');
  }
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
