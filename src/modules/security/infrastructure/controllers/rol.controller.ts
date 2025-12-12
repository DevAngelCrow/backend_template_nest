import { RolCreate } from '../../application/use-cases/rol/rol-create';
import { RolDelete } from '../../application/use-cases/rol/rol-delete';
import { RolGetAll } from '../../application/use-cases/rol/rol-get-all';
import { RolGetOneById } from '../../application/use-cases/rol/rol-get-one-by-id';
import { RolUpdate } from '../../application/use-cases/rol/rol-update';

export class RolController {
  constructor(
    private readonly rolCreate: RolCreate,
    private readonly rolUpdate: RolUpdate,
    private readonly rolGetAll: RolGetAll,
    private readonly rolGetOneById: RolGetOneById,
    private readonly rolDelete: RolDelete,
  ) {}
}
