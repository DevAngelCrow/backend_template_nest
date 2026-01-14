import { AddressRepository } from 'src/modules/profile/domain/repositories/address.repository';
import { AddressDto } from '../../dtos/address.dto';
import { Address } from 'src/modules/profile/domain/entities/address';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class AddressUpdate {
  constructor(protected readonly addressRepository: AddressRepository) {}
  public async run(address_dto: AddressDto): Promise<void> {
    const address = Address.create({ ...address_dto });
    const addressId = address.getId();
    if (!addressId) {
      throw new Error(`Address id is undefined`);
    }
    const foundAddress = await this.addressRepository.getOneById(addressId);
    if (!foundAddress) {
      throw new NotFoundException('Address', addressId.value().toString());
    }
    await this.addressRepository.update(address);
  }
}
