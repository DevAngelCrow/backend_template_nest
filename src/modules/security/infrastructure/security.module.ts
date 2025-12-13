import { Module } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { CategoryPermissionsController } from "./controllers/category-permissions.controller";
import { PermissionsController } from "./controllers/permissions.controller";
import { RolController } from "./controllers/rol.controller";
import { RouteController } from "./controllers/route.controller";

@Module({
    imports: [
        RouterModule.register([{path: 'security', module: SecurityModule}]),
    ],
    controllers: [CategoryPermissionsController,
        PermissionsController, RolController,
        RouteController
    ],
    providers: [],
    exports: [],
})
export class SecurityModule {}