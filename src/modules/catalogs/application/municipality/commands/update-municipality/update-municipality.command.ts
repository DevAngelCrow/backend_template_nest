import { MunicipalityDto } from '../../../dtos/municipality.dto';

export class UpdateMunicipalityCommand {
  constructor(public readonly municipality_dto: MunicipalityDto) {}
}
