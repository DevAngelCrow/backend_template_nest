import { CategoryPermissionsCreate } from '../../application/use-cases/category-permissions/category-permissions-create';
import { CategoryPermissionsDelete } from '../../application/use-cases/category-permissions/category-permissions-delete';
import { CategoryPermissionsGetAll } from '../../application/use-cases/category-permissions/category-permissions-get-all';
import { CategoryPermissionsGetOneById } from '../../application/use-cases/category-permissions/category-permissions-get-one-by-id';
import { CategoryPermissionsUpdate } from '../../application/use-cases/category-permissions/category-permissions-update';

export class CategoryPermissionsController {
  constructor(
    private readonly categoryPermissionsCreate: CategoryPermissionsCreate,
    private readonly categoryPermissionsUpdate: CategoryPermissionsUpdate,
    private readonly categoryPermissionsGetAll: CategoryPermissionsGetAll,
    private readonly categoryPermissionsGetOneById: CategoryPermissionsGetOneById,
    private readonly categoryPermissionsDelete: CategoryPermissionsDelete,
  ) {}
}
