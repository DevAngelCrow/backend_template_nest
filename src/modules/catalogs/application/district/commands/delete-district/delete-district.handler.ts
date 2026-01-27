import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { DeleteDistrictCommand } from './delete-district.command';
import { DistrictId } from '@/modules/catalogs/domain/value-objects/district-value-object/district-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DistrictQueriesRepository } from '../../../repositories/district-read.repository';

export class DeleteDistrictHandler {
  constructor(
    private readonly repository: DistrictRepository,
    private readonly readRepository: DistrictQueriesRepository,
  ) {}
  async execute(command: DeleteDistrictCommand): Promise<void> {
    const district = await this.readRepository.getOneById(
      new DistrictId(command.id),
    );
    if (!district) {
      throw new NotFoundException('District', command.id.toString());
    }
    const districtId = district.getId();
    if (!districtId) {
      throw new Error(`District id is undefined`);
    }
    await this.repository.delete(districtId);
  }
}
