import { AddressRepository } from '@/modules/profile/domain/repositories/address.repository';
import { DeleteAddressCommand } from './delete-address.command';
import { AddressId } from '@/modules/profile/domain/value-objects/address-value-object/address-id';

export class DeleteAddressHandler {
  constructor(private readonly repository: AddressRepository) {}

  async execute(command: DeleteAddressCommand): Promise<void> {
    await this.repository.delete(new AddressId(command.id));
  }
}
