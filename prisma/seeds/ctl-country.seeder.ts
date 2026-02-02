import { PrismaClient } from 'generated/prisma/client';

export const seedCtlCountry = async (tx: PrismaClient) => {
  console.log('Seeding ctl_country data ...');
  await tx.ctl_country.create({
    data: {
      name: 'El Salvador',
      abbreviation: 'ES',
      code: '503',
      active: true,
    },
  });
};
