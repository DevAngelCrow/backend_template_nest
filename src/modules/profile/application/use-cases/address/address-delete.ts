import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';
import { AddressRepository } from 'src/modules/profile/domain/repositories/address.repository';
import { AddressId } from 'src/modules/profile/domain/value-objects/address-value-object/address-id';

@Injectable()
export class AddressDelete {
  constructor(protected readonly addressRepository: AddressRepository) {}
  public async run(id: number): Promise<void> {
    const address = await this.addressRepository.getOneById(
      new AddressId(id),
    );
    if (!address) {
      throw new NotFoundException('Address', id.toString());
    }
    const addressId = address.getId();
    if (!addressId) {
      throw new Error(`Address id is undefined`);
    }
    await this.addressRepository.delete(addressId);
  }
}