import { PrismaClient } from 'generated/prisma/client';

export const seedMntRol = async (tx: PrismaClient) => {
  console.log('Seeding mnt_rol data ...');
  const status = await tx.ctl_status.findFirst({
    where: { id: 3, table_header: 'mnt_rol' },
  });
  if (!status) {
    throw new Error('Please seed ctl_status for mnt_rol first.');
  }
  await tx.mnt_role.createMany({
    data: [
      {
        name: 'administrador',
        description: 'Rol para el administrador',
        id_status: status.id,
        created_at: new Date(),
      },
      {
        name: 'supervisor',
        description: 'Rol para el supervisor',
        id_status: status.id,
        created_at: new Date(),
      },
      {
        name: 'usuario',
        description: 'Rol para el usuario',
        id_status: status.id,
        created_at: new Date(),
      },
    ],
  });
};
