import { Address } from 'src/modules/profile/domain/entities/address';

export class AddressHttpDto {
  constructor(
    public readonly street: string,
    public readonly street_number: string,
    public readonly neighborhood: string,
    public readonly id_district: number,
    public readonly house_number: string,
    public readonly block: string,
    public readonly pathway: string,
    public readonly current: boolean,
    public readonly id_people: number,
    public readonly id?: number,
  ) {}
  public static fromEntity(address: Address): AddressHttpDto {
    return new AddressHttpDto(
      address.getStreet().value(),
      address.getStreetNumber().value(),
      address.getNeighborhood().value(),
      address.getIdDistrict().value(),
      address.getHouseNumber().value(),
      address.getBlock().value(),
      address.getPathway().value(),
      address.getCurrent().value(),
      address.getIdPeople().value(),
      address.getId() ? address.getId()?.value() : undefined,
    );
  }
}
