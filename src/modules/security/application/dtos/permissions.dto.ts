import { Permissions } from '../../domain/entities/permissions';

export class PermissionsDto {
  constructor(
    public readonly name: string,
    public readonly id_category_permissions: number,
    public readonly description: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(permissions: Permissions): PermissionsDto {
    return new PermissionsDto(
      permissions.getName().value(),
      permissions.getIdCategoryPermissions().value(),
      permissions.getDescription().value(),
      permissions.getActive().value(),
      permissions.getId() ? permissions.getId()?.value() : undefined,
    );
  }
}
