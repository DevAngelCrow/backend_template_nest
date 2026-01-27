import { DistrictDto } from '../../../dtos/district.dto';

export class UpdateDistrictCommand {
  constructor(public readonly district_dto: DistrictDto) {}
}
