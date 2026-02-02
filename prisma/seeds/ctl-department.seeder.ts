import { PrismaClient } from 'generated/prisma/client';

export const seedCtlDepartment = async (tx: PrismaClient) => {
  console.log('Seeding ctl_department data ...');
  const country = await tx.ctl_country.findFirst({
    where: { id: 1 },
  });
  if (!country) {
    throw new Error(
      'Country with id 1 not found. Please seed ctl_country first.',
    );
  }
  await tx.ctl_department.create({
    data: {
      name: 'San Salvador',
      id_country: country.id,
      description: 'País soberano',
      active: true,
    },
  });
};
