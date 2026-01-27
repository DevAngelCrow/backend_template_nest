import { AddressId } from '@/modules/profile/domain/value-objects/address-value-object/address-id';
import { GetAddressByIdQuery } from './get-address-by-id.query';
import { AddressReadRepository } from '../../../repositories/address-read.repository';

export class GetAddressByIdHandler {
  constructor(private readonly repository: AddressReadRepository) {}
  async execute(query: GetAddressByIdQuery) {
    return await this.repository.getOneById(new AddressId(query.id));
  }
}
