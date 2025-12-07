import { Address } from '@/modules/profile/domain/entities/address';
import { AddressDto } from '../../dtos/address.dto';
import { AddressCreate } from '../../use-cases/address/address-create';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressCreateService {
  constructor(private readonly addressCreateService: AddressCreate) {}
  async run(address_dto: AddressDto): Promise<Address> {
    return await this.addressCreateService.run(address_dto);
  }
}
