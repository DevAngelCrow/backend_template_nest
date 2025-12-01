import { Injectable } from '@nestjs/common';
import { Country } from '../../domain/entities/country';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { CountryId } from '../../domain/value-objects/country-value-object/country-id';
import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { ctl_country } from 'generated/prisma/client';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';

@Injectable()
export class ImplCountryRepository implements CountryRepository {
  private countries: Country[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(country: Country): Promise<void> {
    try {
      await this.prisma.ctl_country.create({
        data: {
          name: country.getName().value(),
          code: country.getCode().value(),
          abbreviation: country.getAbbreviation().value(),
          active: country.getActive().value(),
        },
      });
      //return countryCreated;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new Error('Error creating country: Unknown error');
    }
  }
  async update(country: Country): Promise<void> {
    try {
      await this.prisma.ctl_country.update({
        where: {
          id: country.getId()?.value(),
        },
        data: {
          name: country.getName().value(),
          code: country.getCode().value(),
          abbreviation: country.getAbbreviation().value(),
          active: country.getActive().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new DatabaseException('Error updating country', 'update');
    }
  }
  async getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ countries: Country[]; total: number }> {
    try {
      const where = {
        name: {
          contains: filter,
        },
      };
      const [countriesDb, total] = await Promise.all([
        this.prisma.ctl_country.findMany({
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
        this.prisma.ctl_country.count({
          where,
        }),
      ]);

      const countries = countriesDb.map((countryDb) =>
        this.mapToDomain(countryDb),
      );

      this.countries = countries;
      return { countries: this.countries, total: total };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new DatabaseException('Error getting countries', 'getAll');
    }
  }
  async getOneById(id: CountryId): Promise<Country | null> {
    try {
      const countryDb = await this.prisma.ctl_country.findFirst({
        where: {
          id: id.value(),
        },
      });
      if (!countryDb) {
        return null;
      }
      const country = this.mapToDomain(countryDb);
      return country;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new NotFoundException('Country', id.value().toString());
    }
  }
  async delete(id: CountryId): Promise<void> {
    try {
      const countryDb = await this.prisma.ctl_country.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!countryDb) {
        throw new NotFoundException('Country', id.value().toString());
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating country: ${error.message}`);
      }
      throw new DatabaseException('Error deleting country', 'delete');
    }
  }
  private mapToDomain(prismaCountry: ctl_country): Country {
    return Country.create({
      id: Number(prismaCountry.id),
      name: prismaCountry.name,
      code: prismaCountry.code,
      abbreviation: prismaCountry.abbreviation,
      active: prismaCountry.active,
    });
  }
}
