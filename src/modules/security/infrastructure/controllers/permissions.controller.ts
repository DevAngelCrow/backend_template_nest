import { CategoryPermissionsDelete } from '../../application/use-cases/category-permissions/category-permissions-delete';
import { CategoryPermissionsGetAll } from '../../application/use-cases/category-permissions/category-permissions-get-all';
import { CategoryPermissionsUpdate } from '../../application/use-cases/category-permissions/category-permissions-update';
import { PermissionsCreate } from '../../application/use-cases/permissions/permissions-create';
import { PermissionsGetOneById } from '../../application/use-cases/permissions/permissions-get-one-by-id';

export class PermissionsController {
  constructor(
    private readonly permissionsCreate: PermissionsCreate,
    private readonly permissionsUpdate: CategoryPermissionsUpdate,
    private readonly permissionsGetAll: CategoryPermissionsGetAll,
    private readonly permissionsGetOneById: PermissionsGetOneById,
    private readonly permissionsDelete: CategoryPermissionsDelete,
  ) {}
}
