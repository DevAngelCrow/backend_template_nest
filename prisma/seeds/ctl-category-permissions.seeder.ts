import { PrismaClient } from 'generated/prisma/client';

export const seedCtlCategoryPermissions = async (tx: PrismaClient) => {
  console.log('Seeding ctl_category_permissions data ...');
  await tx.ctl_category_permissions.createMany({
    data: [
      {
        name: 'Rutas',
        description: 'Para las rutas del sistema',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Categoria de permiso',
        description: 'Categoria del permiso',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Permisos',
        description: 'Permiso',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Roles',
        description: 'Categoria para roles',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Usuarios-Roles',
        description: 'Roles relacionados a los usuarios',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Verificacion de correo',
        description: 'Verificacion de correo electronico',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Inicio de sesion',
        description: 'Para el inicio de sesion',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Registro',
        description: 'Para el registro del nuevo usuario',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Usuario',
        description: 'Creacion de usuario individual',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Estados globales',
        description: 'Para los estados dinamicos',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Estado civil',
        description: 'Para el estado civil',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Pais',
        description: 'Para el catalogo de pais',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Departamento',
        description: 'Para el catalogo de departamento',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Municipio',
        description: 'Para el catalogo de municipio',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Distrito',
        description: 'Para el catalogo de distrito',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Documento',
        description: 'Para el registro de documentos de persona',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Tipo de documento',
        description: 'Para el catalogo de tipos de documentos',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Direccion',
        description: 'Para registro de direcciones de persona',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Persona',
        description: 'Para el mantenimiento de personas',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Proveedor de almacenamiento',
        description: 'Para el mantenimiento del proveedor de almacenamiento',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Destino de almacenamiento',
        description: 'Para el mantenimiento de personas',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Layout',
        description: 'Para ver el layout principal',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Test',
        description: 'Para la vista de test de componentes',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Dashboard',
        description: 'Para la vista de tablero',
        active: true,
        created_at: new Date(),
      },
      {
        name: 'Menu usuario',
        description: 'Para el menú del usuario que desplega en el avatar',
        active: true,
        created_at: new Date(),
      },
    ],
  });
};
