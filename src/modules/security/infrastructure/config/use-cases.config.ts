import { Abstract, Type } from "@nestjs/common"
import { CategoryPermissionsCreate } from "../../application/use-cases/category-permissions/category-permissions-create";
import { CategoryPermissionsRepository } from "../../domain/repositories/category-permissions-repository";
import { CategoryPermissionsUpdate } from "../../application/use-cases/category-permissions/category-permissions-update";
import { CategoryPermissionsDelete } from "../../application/use-cases/category-permissions/category-permissions-delete";
import { CategoryPermissionsGetAll } from "../../application/use-cases/category-permissions/category-permissions-get-all";
import { CategoryPermissionsGetOneById } from "../../application/use-cases/category-permissions/category-permissions-get-one-by-id";
import { PermissionsCreate } from "../../application/use-cases/permissions/permissions-create";
import { PermissionsUpdate } from "../../application/use-cases/permissions/permissions-update";
import { PermissionsGetAll } from "../../application/use-cases/permissions/permissions-get-all";
import { PermissionsGetOneById } from "../../application/use-cases/permissions/permissions-get-one-by-id";
import { PermissionsDelete } from "../../application/use-cases/permissions/permissions-delete";
import { PermissionsRepository } from "../../domain/repositories/permissions-repository";
import { RolCreate } from "../../application/use-cases/rol/rol-create";
import { RolRepository } from "../../domain/repositories/rol-repository";
import { RolUpdate } from "../../application/use-cases/rol/rol-update";
import { RolGetAll } from "../../application/use-cases/rol/rol-get-all";
import { RolGetOneById } from "../../application/use-cases/rol/rol-get-one-by-id";
import { RolDelete } from "../../application/use-cases/rol/rol-delete";

export const useCases: Array<{
    useCase: Type<unknown>;
    deps: Array<Type<unknown> | Abstract<unknown>>;
}> = [
    //Category permissions use cases
        {
            useCase: CategoryPermissionsCreate,
            deps: [CategoryPermissionsRepository],
        },
        {
            useCase: CategoryPermissionsUpdate,
            deps: [CategoryPermissionsRepository],
        },
        {
            useCase: CategoryPermissionsGetOneById,
            deps: [CategoryPermissionsRepository],
        },
        {
            useCase: CategoryPermissionsUpdate,
            deps: [CategoryPermissionsRepository],
        },
        {
            useCase: CategoryPermissionsDelete,
            deps: [CategoryPermissionsRepository],
        },
    
    //Permissions use cases
    {
            useCase: PermissionsCreate,
            deps: [PermissionsRepository],
        },
         {
            useCase: PermissionsUpdate,
            deps: [PermissionsRepository],
        },
         {
            useCase: PermissionsGetAll,
            deps: [PermissionsRepository],
        },
         {
            useCase: PermissionsGetOneById,
            deps: [PermissionsRepository],
        },
         {
            useCase: PermissionsDelete,
            deps: [PermissionsRepository],
        },
        //Rol use cases
        {
            useCase: RolCreate,
            deps: [RolRepository],
        },
        {
            useCase: RolUpdate,
            deps: [RolRepository],
        },
        {
            useCase: RolGetAll,
            deps: [RolRepository],
        },
        {
            useCase: RolGetOneById,
            deps: [RolRepository],
        },
        {
            useCase: RolDelete,
            deps: [RolRepository],
        },
        //Route use cases

    ]