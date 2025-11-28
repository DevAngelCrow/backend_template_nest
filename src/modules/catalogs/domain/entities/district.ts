import { DistrictIdMunicipality } from '../value-objects/district-value-object/district-id-municipality';

export class District {
  constructor(private readonly id_municipality: DistrictIdMunicipality) {}
}
