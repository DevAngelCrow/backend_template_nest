import { DistrictRepository } from '@/modules/catalogs/domain/repositories/district-repository';
import { CreateDistrictCommand } from './create-district.command';
import { District } from '@/modules/catalogs/domain/entities/district';

export class CreateDistrictHandler {
  constructor(private readonly repository: DistrictRepository) {}

  async execute(command: CreateDistrictCommand): Promise<void> {
    const district = District.create({ ...command.district_dto });
    await this.repository.create(district);
  }
}
