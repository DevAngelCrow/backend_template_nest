import { PersonBirthdate } from '../value-objects/person-value-object/person-birthdate';
import { PersonEmail } from '../value-objects/person-value-object/person-email';
import { PersonFirstName } from '../value-objects/person-value-object/person-first-name';
import { PersonId } from '../value-objects/person-value-object/person-id';
import { PersonIdGender } from '../value-objects/person-value-object/person-id-gender';
import { PersonIdMaritalStatus } from '../value-objects/person-value-object/person-id-marital-status';
import { PersonIdStatus } from '../value-objects/person-value-object/person-id-status';
import { PersonImgPath } from '../value-objects/person-value-object/person-img-path';
import { PersonLastName } from '../value-objects/person-value-object/person-last-name';
import { PersonMiddleName } from '../value-objects/person-value-object/person-middle-name';
import { PersonPhone } from '../value-objects/person-value-object/person-phone';

export class Person {
  constructor(
    private readonly first_name: PersonFirstName,
    private readonly birthdate: PersonBirthdate,
    private readonly id_gender: PersonIdGender,
    private readonly email: PersonEmail,
    private readonly id_marital_status: PersonIdMaritalStatus,
    private readonly phone: PersonPhone,
    private readonly id_status: PersonIdStatus,
    private readonly last_name: PersonLastName,
    private readonly img_path: PersonImgPath,
    private readonly middle_name?: PersonMiddleName,
    private readonly id?: PersonId,
  ) {}
  static create(data: {
    id?: number;
    first_name: string;
    birthdate: Date;
    id_gender: number;
    email: string;
    id_marital_status: number;
    phone: string;
    id_status: number;
    middle_name?: string;
    last_name: string;
    img_path: string;
  }): Person {
    return new Person(
      new PersonFirstName(data.first_name),
      new PersonBirthdate(data.birthdate),
      new PersonIdGender(data.id_gender),
      new PersonEmail(data.email),
      new PersonIdMaritalStatus(data.id_marital_status),
      new PersonPhone(data.phone),
      new PersonIdStatus(data.id_status),
      new PersonLastName(data.last_name),
      new PersonImgPath(data.img_path),
      data.middle_name ? new PersonMiddleName(data.middle_name) : undefined,
      data.id ? new PersonId(data.id) : undefined,
    );
  }
  getId(): PersonId | undefined {
    return this.id;
  }
  getFirstName(): PersonFirstName {
    return this.first_name;
  }
  getBirthdate(): PersonBirthdate {
    return this.birthdate;
  }
  getIdGender(): PersonIdGender {
    return this.id_gender;
  }
  getEmail(): PersonEmail {
    return this.email;
  }
  getIdMaritalStatus(): PersonIdMaritalStatus {
    return this.id_marital_status;
  }
  getPhone(): PersonPhone {
    return this.phone;
  }
  getIdStatus(): PersonIdStatus {
    return this.id_status;
  }
  getMiddleName(): PersonMiddleName | undefined {
    return this.middle_name;
  }
  getLastName(): PersonLastName {
    return this.last_name;
  }
  getImgPath(): PersonImgPath {
    return this.img_path;
  }
}
