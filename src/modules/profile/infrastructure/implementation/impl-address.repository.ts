import { Injectable } from '@nestjs/common';
import { Address } from '../../domain/entities/address';
import { AddressRepository } from '../../domain/repositories/address.repository';
import { AddressId } from '../../domain/value-objects/address-value-object/address-id';
import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { mnt_address } from 'generated/prisma/client';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { EntityList } from '@/shared/domain/value-object/entity-list';
import { TotalItems } from '@/shared/domain/value-object/total-items';
import { TotalPages } from '@/shared/domain/value-object/total-page';

@Injectable()
export class ImplAddressRepository implements AddressRepository {
  private addresses: Address[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async create(address: Address): Promise<void> {
    try {
      await this.prisma.mnt_address.create({
        data: {
          street: address.getStreet().value(),
          street_number: address.getStreetNumber().value(),
          neighborhood: address.getNeighborhood().value(),
          id_district: address.getIdDistrict().value(),
          house_number: address.getHouseNumber().value(),
          block: address.getBlock().value(),
          pathway: address.getPathway().value(),
          current: address.getCurrent().value(),
          id_people: address.getIdPeople().value(),
          active: true,
        },
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error creating address: ${error.message}`);
      }
      throw new DatabaseException('Error creating address', 'create');
    }
  }
  async update(address: Address): Promise<void> {
    try {
      await this.prisma.mnt_address.update({
        where: {
          id: address.getId()?.value(),
        },
        data: {
          street: address.getStreet().value(),
          street_number: address.getStreetNumber().value(),
          neighborhood: address.getNeighborhood().value(),
          id_district: address.getIdDistrict().value(),
          house_number: address.getHouseNumber().value(),
          block: address.getBlock().value(),
          pathway: address.getPathway().value(),
          current: address.getCurrent().value(),
          id_people: address.getIdPeople().value(),
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error updating address: ${error.message}`);
      }
      throw new DatabaseException('Error updating address', 'update');
    }
  }
  async getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<Address> | Address[]> {
    try {
      const where = {
        street: {
          contains: filter,
          mode: 'insensitive' as const,
        },
      };
      const [addressesDb, total] = await Promise.all([
        this.prisma.mnt_address.findMany({
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
        this.prisma.mnt_address.count({ where }),
      ]);

      const addresses =
        addressesDb.length > 0
          ? addressesDb.map((addressDb: mnt_address) =>
              this.mapToDomain(addressDb),
            )
          : [];

      this.addresses = addresses;

      if (!pagination_params) {
        return this.addresses;
      }

      const entityList: EntityList<Address> =
        addresses.length > 0
          ? new EntityList<Address>(this.addresses)
          : new EntityList<Address>([]);

      return new Pagination<Address>(
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
        throw new Error(`Error getting addresses: ${error.message}`);
      }
      throw new DatabaseException('Error getting addresses', 'getAll');
    }
  }
  async getOneById(id: AddressId): Promise<Address | null> {
    try {
      const addressDb: mnt_address | null =
        await this.prisma.mnt_address.findFirst({
          where: {
            id: id.value(),
          },
        });
      if (!addressDb) {
        return null;
      }
      const address = this.mapToDomain(addressDb);
      return address;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting address: ${error.message}`);
      }
      throw new NotFoundException('Address', id.value().toString());
    }
  }
  async delete(id: AddressId): Promise<void> {
    try {
      const addressDb = await this.prisma.mnt_address.update({
        where: {
          id: id.value(),
        },
        data: {
          active: false,
        },
      });
      if (!addressDb) {
        throw new NotFoundException('Address', id.value().toString());
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error deleting address: ${error.message}`);
      }
      throw new DatabaseException('Error deleting address', 'delete');
    }
  }
  private mapToDomain(prismaAddress: mnt_address): Address {
    return Address.create({
      id: Number(prismaAddress.id),
      street: prismaAddress.street,
      street_number: prismaAddress.street_number,
      neighborhood: prismaAddress.neighborhood,
      id_district: Number(prismaAddress.id_district),
      house_number: prismaAddress.house_number,
      block: prismaAddress.block,
      pathway: prismaAddress.pathway,
      current: prismaAddress.current,
      id_people: Number(prismaAddress.id_people),
    });
  }
}
