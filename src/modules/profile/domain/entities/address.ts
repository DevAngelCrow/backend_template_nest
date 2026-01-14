import { AddressBlock } from '../value-objects/address-value-object/address-block';
import { AddressCurrent } from '../value-objects/address-value-object/address-current';
import { AddressHouseNumber } from '../value-objects/address-value-object/address-house-number';
import { AddressId } from '../value-objects/address-value-object/address-id';
import { AddressIdDistrict } from '../value-objects/address-value-object/address-id-district';
import { AddressIdPeople } from '../value-objects/address-value-object/address-id-people';
import { AddressNeighborhood } from '../value-objects/address-value-object/address-neighborhood';
import { AddressPathway } from '../value-objects/address-value-object/address-pathway';
import { AddressStreet } from '../value-objects/address-value-object/address-street';
import { AddressStreetNumber } from '../value-objects/address-value-object/address-street-number';

export class Address {
  constructor(
    private readonly street: AddressStreet,
    private readonly street_number: AddressStreetNumber,
    private readonly neighborhood: AddressNeighborhood,
    private readonly id_district: AddressIdDistrict,
    private readonly house_number: AddressHouseNumber,
    private readonly block: AddressBlock,
    private readonly pathway: AddressPathway,
    private readonly current: AddressCurrent,
    private readonly id_people: AddressIdPeople,
    private readonly id?: AddressId,
  ) {}
  static create(data: {
    id?: number;
    street: string;
    street_number: string;
    neighborhood: string;
    id_district: number;
    house_number: string;
    block: string;
    pathway: string;
    current: boolean;
    id_people: number;
  }): Address {
    return new Address(
      new AddressStreet(data.street),
      new AddressStreetNumber(data.street_number),
      new AddressNeighborhood(data.neighborhood),
      new AddressIdDistrict(data.id_district),
      new AddressHouseNumber(data.house_number),
      new AddressBlock(data.block),
      new AddressPathway(data.pathway),
      new AddressCurrent(data.current),
      new AddressIdPeople(data.id_people),
      data.id ? new AddressId(data.id) : undefined,
    );
  }
  getId(): AddressId | undefined {
    return this.id;
  }
  getStreet(): AddressStreet {
    return this.street;
  }
  getStreetNumber(): AddressStreetNumber {
    return this.street_number;
  }
  getNeighborhood(): AddressNeighborhood {
    return this.neighborhood;
  }
  getIdDistrict(): AddressIdDistrict {
    return this.id_district;
  }
  getHouseNumber(): AddressHouseNumber {
    return this.house_number;
  }
  getBlock(): AddressBlock {
    return this.block;
  }
  getPathway(): AddressPathway {
    return this.pathway;
  }
  getCurrent(): AddressCurrent {
    return this.current;
  }
  getIdPeople(): AddressIdPeople {
    return this.id_people;
  }
}
