export class UserAuthDto {
  constructor(
    public readonly user_name: string,
    public readonly id: number,
    public readonly permissions: string[],
    public readonly id_status: number,
    public readonly last_access: Date,
    public readonly is_validated: boolean,
    public readonly id_people: number,
  ) {}
  public static fromEntity(data: {
    user_name: string;
    id: number;
    permissions: string[];
    id_status: number;
    last_access: Date;
    is_validated: boolean;
    id_people: number;
  }): UserAuthDto {
    return new UserAuthDto(
      data.user_name,
      data.id,
      data.permissions,
      data.id_status,
      data.last_access,
      data.is_validated,
      data.id_people,
    );
  }
}
