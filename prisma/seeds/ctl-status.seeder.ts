import { PrismaClient } from 'generated/prisma/client';

export const seedCtlStatus = async (tx: PrismaClient) => {
  console.log('Seeding ctl_status data ...');
  await tx.ctl_status.createMany({
    data: [
      {
        table_header: 'mnt_people',
        name: 'Activo',
        description: 'Estado activo',
        state: true,
      },
      {
        table_header: 'mnt_user',
        name: 'Activo',
        description: 'Estado activo',
        state: true,
      },
      {
        table_header: 'mnt_role',
        name: 'Activo',
        description: 'Estado activo',
        state: true,
      },
    ],
  });
};
