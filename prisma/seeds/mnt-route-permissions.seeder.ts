import { PrismaClient } from 'generated/prisma/client';

export const seedMntRoutePermissions = async (tx: PrismaClient) => {
  console.log('Seeding mnt_route_permissions data ...');
  await tx.mnt_route_permissions.deleteMany({});
  const permissionsMap: Record<string, Record<string, string[]>> = {
    Rutas: {
      'routes-administration': [
        'listar-rutas',
        'crear-ruta',
        'editar-ruta',
        'ver-ruta',
        'eliminar-ruta',
      ],
    },
    'Categoria de permiso': {
      'crear-categoria-permiso': [],
      'listar-categorias-permisos': [],
      'editar-categoria-permiso': [],
      'ver-categoria-permiso': [],
      'eliminar-categoria-permiso': [],
    },
    Permisos: {
      'crear-permiso': [],
      'listar-permisos': [],
      'editar-permiso': [],
      'ver-permiso': [],
      'eliminar-permiso': [],
    },
    Roles: {
      'crear-rol': [],
      'listar-roles': [],
      'editar-rol': [],
      'ver-rol': [],
      'eliminar-rol': [],
    },
    'Usuarios-Roles': {
      'crear-usuario-rol': [],
      'editar-usuario-rol': [],
    },
    'Verificacion de correo': {
      'verify-email': ['verificar-correo-usuario'],
      'pending-verification-email': [
        'solicitar-enlace-verificacion-correo-usuario',
      ],
    },
    'Inicio de sesion': {
      login: ['inicio-sesion'],
    },
    Registro: {
      'sign-up': ['registro-usuario'],
    },
    Layout: {
      layout: ['ver-layout'],
    },
    Test: {
      'test-view': ['ver-test-components'],
    },
    Dashboard: {
      dashboard: ['ver-tablero'],
    },
    'Menu usuario': {
      Usuario: ['ver-menu-usuario'],
    },
    Usuario: {
      'crear-usuario': [],
      'ver-usuario-correo': [],
      'cerrar-sesion': [],
      'ver-nombre-usuario-menu': [],
    },
    'Estados globales': {
      'crear-estado-global': [],
      'listar-estados-globales': [],
      'editar-estado-global': [],
      'ver-estado-global': [],
      'eliminar-estado-global': [],
    },
    'Estado civil': {
      'crear-estado-civil': [],
      'listar-estados-civiles': [],
      'editar-estado-civil': [],
      'ver-estado-civil': [],
      'eliminar-estado-civil': [],
    },
    Pais: {
      'crear-pais': [],
      'listar-paises': [],
      'editar-pais': [],
      'ver-pais': [],
      'eliminar-pais': [],
    },
    Departamento: {
      'crear-departamento': [],
      'listar-departamentos': [],
      'editar-departamento': [],
      'ver-departamento': [],
      'eliminar-departamento': [],
    },
    Municipio: {
      'crear-municipio': [],
      'listar-municipio': [],
      'editar-municipio': [],
      'ver-municipio': [],
      'eliminar-municipio': [],
    },
    Distrito: {
      'crear-distrito': [],
      'listar-distrito': [],
      'editar-distrito': [],
      'ver-distrito': [],
      'eliminar-distrito': [],
    },
    Documento: {
      'crear-documento': [],
      'listar-documentos': [],
      'editar-documentos': [],
      'ver-documento': [],
      'eliminar-documento': [],
    },
    'Tipo de documento': {
      'crear-tipo-documento': [],
      'listar-tipos-documentos': [],
      'editar-tipo-documento': [],
      'ver-tipo-documento': [],
      'eliminar-tipo-documento': [],
    },
    Direccion: {
      'crear-direccion': [],
      'listar-direcciones': [],
      'editar-direccion': [],
      'ver-direccion': [],
      'eliminar-direccion': [],
    },
    Persona: {
      'crear-persona': [],
      'listar-personas': [],
      'editar-persona': [],
      'ver-persona': [],
      'eliminar-persona': [],
      'ver-persona-email': [],
    },
    'Proveedor de almacenamiento': {
      'crar-proveedor-almacenamiento': [],
      'listar-proveedores-almacenamientos': [],
      'editar-proveedor-almacenamiento': [],
      'ver-proveedor-almacenamiento': [],
      'eliminar-proveedor-almacenamiento': [],
    },
    'Destino de almacenamiento': {
      'subir-multimedia-almacenamiento': [],
    },
  };
  for (const [categoryName, routes] of Object.entries(permissionsMap)) {
    const category = await tx.ctl_category_permissions.findFirst({
      where: { name: categoryName },
    });
    if (!category) {
      console.warn(
        `[!] Advertencia: La categoría de permisos '${categoryName}' no fue encontrada en la BD. Saltando...`,
      );
      continue;
    }
    for (const [routeName, permissionsNames] of Object.entries(routes)) {
      const route = await tx.mnt_route.findFirst({
        where: { name: routeName },
      });
      if (!route) {
        continue;
      }
      if (permissionsNames.length === 0) {
        continue;
      }
      const permissions = await tx.ctl_permissions.findMany({
        where: {
          id_category_permissions: category.id,
          name: { in: permissionsNames },
        },
      });
      if (permissions.length === 0) {
        continue;
      }
      const dataToInsert = permissions.map((permission) => ({
        id_route: route.id,
        id_permission: permission.id,
        created_at: new Date(),
      }));
      await tx.mnt_route_permissions.createMany({
        data: dataToInsert,
      });
      console.log(
        `> Ruta '${routeName}': ${dataToInsert.length} permisos asignados correctamente.`,
      );
    }
  }
  console.log('> Seed de mnt_route_permissions completado.');
};
