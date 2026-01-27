import { MunicipalityDto } from '../../../dtos/municipality.dto';

export class CreateMunicipalityCommand {
  constructor(public readonly municipality_dto: MunicipalityDto) {}
}
