import { DistrictDto } from '../../../dtos/district.dto';

export class CreateDistrictCommand {
  constructor(public readonly district_dto: DistrictDto) {}
}
