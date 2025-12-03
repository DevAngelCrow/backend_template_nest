import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { Address } from 'src/modules/profile/domain/entities/address';
import { AddressRepository } from 'src/modules/profile/domain/repositories/address.repository';
import { AddressId } from 'src/modules/profile/domain/value-objects/address-value-object/address-id';

@Injectable()
export class AddressGetOneById {
  constructor(protected readonly addressRepository: AddressRepository) {}
  public async run(id: number): Promise<Address | null> {
    const addressId = new AddressId(id);
    const address = await this.addressRepository.getOneById(addressId);
    if (!address) {
      throw new NotFoundException('Address', id.toString());
    }
    return address;
  }
}