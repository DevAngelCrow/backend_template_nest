import { AddressRepository } from 'src/modules/profile/domain/repositories/address.repository';
import { AddressDto } from '../../dtos/address.dto';
import { Address } from 'src/modules/profile/domain/entities/address';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressCreate {
  constructor(protected readonly addressRepository: AddressRepository) {}
  public async run(address_dto: AddressDto): Promise<void> {
    const address = Address.create({ ...address_dto });
    await this.addressRepository.create(address);
  }
}