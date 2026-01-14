import { PrismaClient } from 'generated/prisma/client';

export const seedRolPermissions = async (tx: PrismaClient) => {
  console.log('Seeding rol_permissions data ...');
  const rol = await tx.mnt_role.findFirst({
    where: { id: 1 },
  });
  const permissions = await tx.ctl_permissions.findMany({
    orderBy: { id: 'asc' },
  });
  if (!rol || permissions.length === 0) {
    throw new Error('Please seed mnt_role and ctl_permissions first.');
  }
  const data = permissions.map((permission) => ({
    id_role: Number(rol.id),
    id_permission: Number(permission.id),
    created_at: new Date(),
  }));
  await tx.rol_permissions.createMany({
    data,
  });
};
