import { DistrictActive } from '../value-objects/district-value-object/district-active';
import { DistrictDescription } from '../value-objects/district-value-object/district-description';
import { DistrictId } from '../value-objects/district-value-object/district-id';
import { DistrictIdMunicipality } from '../value-objects/district-value-object/district-id-municipality';
import { DistrictName } from '../value-objects/district-value-object/district-name';

export class District {
  constructor(
    private readonly id_municipality: DistrictIdMunicipality,
    private readonly name: DistrictName,
    private readonly description: DistrictDescription,
    private readonly active: DistrictActive,
    private readonly id?: DistrictId,
  ) {}
  public getId(): DistrictId | undefined {
    return this.id;
  }
  public getIdMunicipality(): DistrictIdMunicipality {
    return this.id_municipality;
  }
  public getDescription(): DistrictDescription {
    return this.description;
  }
  public getActive(): DistrictActive {
    return this.active;
  }
  public getName(): DistrictName {
    return this.name;
  }
}
