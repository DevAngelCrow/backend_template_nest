import { Injectable } from '@nestjs/common';
import { Country } from '../../../domain/entities/country';
import { CountryRepository } from '../../../domain/repositories/country-repository';
import { CountryId } from '../../../domain/value-objects/country-value-object/country-id';
import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { ctl_country } from 'generated/prisma/client';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';
import { CountryQueriesRepository } from '@/modules/catalogs/application/repositories/country-read.repository';

@Injectable()
export class ImplCountryRepository
  implements CountryRepository, CountryQueriesRepository
{
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
      throw new DatabaseException('Error creating country', 'create');
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
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Country> | Country[]> {
    try {
      const where = {
        name: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [countriesDb, total] = await Promise.all([
        this.prisma.ctl_country.findMany({
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
        this.prisma.ctl_country.count({ where }),
      ]);

      const countries =
        countriesDb.length > 0
          ? countriesDb.map((countryDb: ctl_country) =>
              this.mapToDomain(countryDb),
            )
          : [];

      this.countries = countries;

      if (!pagination_params) {
        return this.countries;
      }

      const entityList: EntityList<Country> =
        countries.length > 0
          ? new EntityList<Country>(this.countries)
          : new EntityList<Country>([]);

      return new Pagination<Country>(
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
        throw new Error(`Error getting countries: ${error.message}`);
      }
      throw new DatabaseException('Error getting countries', 'getAll');
    }
  }
  async getOneById(id: CountryId): Promise<Country | null> {
    try {
      const countryDb: ctl_country | null =
        await this.prisma.ctl_country.findFirst({
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
