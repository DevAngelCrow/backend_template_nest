import { Address } from '../entities/address';
import { AddressId } from '../value-objects/address-value-object/address-id';

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>;
  abstract update(address: Address): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ addresses: Address[]; total: number }>;
  abstract getOneById(id: AddressId): Promise<Address | null>;
  abstract delete(id: AddressId): Promise<void>;
}
