import { PrismaClient } from 'generated/prisma/client';

export const seedCtlProviderStorage = async (tx: PrismaClient) => {
  console.log('Seeding ctl_gender data ...');
  await tx.ctl_provider_storage.create({
    data: {
      name: 'LOCAL',
      code: 'LOCAL',
      description: 'LOCAL',
      active: true,
    },
  });
};
