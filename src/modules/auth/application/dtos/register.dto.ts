export class RegisterDto<T> {
  constructor(
    // People data
    public readonly first_name: string,
    public readonly middle_name: string,
    public readonly last_name: string,
    public readonly birthdate: Date,
    public readonly email: string,
    public readonly id_gender: number,
    public readonly id_marital_status: number,
    public readonly phone: string,
    public readonly id_status: number,
    public readonly nationalities: number[] = [],
    public readonly file_img: T,
    public readonly id_people: number | undefined = undefined,

    // User data
    public readonly user_name: string,
    public readonly password: string,
    public readonly id_status_user: number,
    public readonly last_access: Date,
    public readonly is_validated: boolean,
    public readonly id_user: number | undefined = undefined,

    // Address data
    public readonly street: string,
    public readonly street_number: string,
    public readonly neighborhood: string,
    public readonly id_district: number,
    public readonly house_number: string,
    public readonly block: string,
    public readonly pathway: string,
    public readonly current: boolean,
    public readonly id_address: number | undefined = undefined,
    public readonly active_address: boolean,

    // Document data
    public readonly id_type_document: number,
    public readonly description: string,
    public readonly document_number: string,
    public readonly active: boolean,
    public readonly id_document: number | undefined = undefined,
  ) {}
}
