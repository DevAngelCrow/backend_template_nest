import { PrismaClient } from 'generated/prisma/client';

export const seedCtlMaritalStatus = async (tx: PrismaClient) => {
  console.log('Seeding ctl_marital_status data ...');
  await tx.ctl_marital_status.createMany({
    data: [
      { name: 'Soltero', description: 'Estado civil soltero' },
      { name: 'Casado', description: 'Estado civil casado' },
      {
        name: 'Divorciado',
        description: 'Estado civil divorciado',
      },
    ],
  });
};
