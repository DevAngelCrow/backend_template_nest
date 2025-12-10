import { Address } from 'src/modules/profile/domain/entities/address';
import { AddressRepository } from 'src/modules/profile/domain/repositories/address.repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class AddressGetAll {
  constructor(protected readonly addressRepository: AddressRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Address> | Address[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.addressRepository.getAll(paginationParams, filter);
    }
    return await this.addressRepository.getAll(undefined, filter);
  }
}
