import { User } from '@/modules/identity-access-management/domain/entities/user';

export class UserHttpDto {
  constructor(
    public readonly user_name: string,
    public readonly id_status: number,
    public readonly is_validated: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(user: User): UserHttpDto {
    return new UserHttpDto(
      user.getUserName().value(),
      user.getIdStatus().value(),
      user.getIsValidated().value(),
      user.getId() ? user.getId()?.value() : undefined,
    );
  }
}
