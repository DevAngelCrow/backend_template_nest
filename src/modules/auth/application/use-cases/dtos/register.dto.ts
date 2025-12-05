export class RegisterDto<T> {
  constructor(
    // People data
    public readonly firstName: string,
    public readonly middleName: string,
    public readonly lastName: string,
    public readonly birthdate: Date,
    public readonly email: string,
    public readonly idGender: number,
    public readonly idMaritalStatus: number,
    public readonly phone: string,
    public readonly idStatus: number,
    public readonly nationalities: number[] | null = null,
    public readonly fileImg: T,
    public readonly idPeople: number | null = null,

    // User data
    public readonly userName: string,
    public readonly password: string,
    public readonly idStatusUser: number,
    public readonly lastAccess: Date,
    public readonly isValidated: boolean,
    public readonly idUser: number | null = null,

    // Address data
    public readonly street: string,
    public readonly streetNumber: string,
    public readonly neighborhood: string,
    public readonly idDistrict: number,
    public readonly houseNumber: string,
    public readonly block: string,
    public readonly pathway: string,
    public readonly current: boolean,
    public readonly idAddress: number | null = null,
    public readonly activeAddress: boolean,

    // Document data
    public readonly idTypeDocument: number,
    public readonly description: string,
    public readonly documentNumber: string,
    public readonly active: boolean,
    public readonly idDocument: number | null = null,
  ) {}
}
