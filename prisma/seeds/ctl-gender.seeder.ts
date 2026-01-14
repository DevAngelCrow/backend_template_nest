import { PrismaClient } from 'generated/prisma/client';

export const seedCtlGender = async (tx: PrismaClient) => {
  console.log('Seeding ctl_gender data ...');
  await tx.ctl_gender.createMany({
    data: [{ name: 'Masculino' }, { name: 'Femenino' }, { name: 'Otro' }],
  });
};
