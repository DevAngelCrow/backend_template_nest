import { Person } from 'src/modules/profile/domain/entities/person';

export class PersonHttpDto {
  constructor(
    public readonly first_name: string,
    public readonly birth_date: Date,
    public readonly id_gender: number,
    public readonly email: string,
    public readonly id_marital_status: number,
    public readonly phone: string,
    public readonly id_status: number,
    public readonly middle_name: string,
    public readonly last_name: string,
    public readonly img_path: string,
    public readonly nationalities: number[] = [],
    public readonly id?: number,
  ) {}
  public static fromEntity(
    person: Person,
    nationalities: number[] = [],
  ): PersonHttpDto {
    return new PersonHttpDto(
      person.getFirstName().value(),
      person.getBirthdate().value(),
      person.getIdGender().value(),
      person.getEmail().value(),
      person.getIdMaritalStatus().value(),
      person.getPhone().value(),
      person.getIdStatus().value(),
      person.getMiddleName() ? person.getMiddleName()!.value() : '',
      person.getLastName().value(),
      person.getImgPath().value(),
      nationalities,
      person.getId()?.value(),
    );
  }
}
