import { User } from '@/modules/identity-access-management/domain/entities/user';

export class UserDto {
  constructor(
    public readonly id_people: number,
    public readonly user_name: string,
    public readonly password: string,
    public readonly id_status: number,
    public readonly last_access: Date,
    public readonly is_validated: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(user: User): UserDto {
    return new UserDto(
      user.getIdPeople().value(),
      user.getUserName().value(),
      user.getPassword().value(),
      user.getIdStatus().value(),
      user.getLastAccess().value(),
      user.getIsValidated().value(),
      user.getId() ? user.getId()?.value() : undefined,
    );
  }
}
