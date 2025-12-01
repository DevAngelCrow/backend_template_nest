import { Injectable } from '@nestjs/common';
import { Country } from '../../domain/entities/country';
import { CountryRepository } from '../../domain/repositories/country-repository';
import { CountryId } from '../../domain/value-objects/country-value-object/country-id';
import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';

@Injectable()
export class ImplCountryRepository implements CountryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async create(country: Country): Promise<void> {
    try {
      await this.prisma.client.ctl_country.create({
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
  update(country: Country): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<Country[]> {
    throw new Error('Method not implemented.');
  }
  getOneById(id: CountryId): Promise<Country | null> {
    throw new Error('Method not implemented.');
  }
  delete(id: CountryId): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
