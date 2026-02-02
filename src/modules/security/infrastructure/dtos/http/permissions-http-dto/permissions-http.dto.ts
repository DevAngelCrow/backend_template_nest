import { Permissions } from '@/modules/security/domain/entities/permissions';
export class PermissionsHttpDto {
  constructor(
    public readonly name: string,
    public readonly id_category_permissions: number,
    public readonly description: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(permissions: Permissions): PermissionsHttpDto {
    return new PermissionsHttpDto(
      permissions.getName().value(),
      permissions.getIdCategoryPermissions().value(),
      permissions.getDescription().value(),
      permissions.getActive().value(),
      permissions.getId() ? permissions.getId()?.value() : undefined,
    );
  }
}
