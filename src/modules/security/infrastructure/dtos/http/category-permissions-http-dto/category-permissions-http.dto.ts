import { CategoryPermissions } from '@/modules/security/domain/entities/category-permissions';

export class CategoryPermissionsHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(
    categoryPermissions: CategoryPermissions,
  ): CategoryPermissionsHttpDto {
    return new CategoryPermissionsHttpDto(
      categoryPermissions.getName().value(),
      categoryPermissions.getDescription().value(),
      categoryPermissions.getActive().value(),
      categoryPermissions.getId()
        ? categoryPermissions.getId()?.value()
        : undefined,
    );
  }
}
