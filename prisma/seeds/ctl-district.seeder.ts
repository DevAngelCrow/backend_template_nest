import { PrismaClient } from 'generated/prisma/client';

export const seedCtlDistrict = async (tx: PrismaClient) => {
  console.log('Seeding ctl_district data ...');
  const municipality = await tx.ctl_municipality.findFirst({
    where: { id: 1 },
  });
  if (!municipality) {
    throw new Error(
      'Municipality with id 1 not found. Please seed ctl_municipality first.',
    );
  }
  await tx.ctl_district.create({
    data: {
      id_municipality: municipality.id,
      name: 'Soyapango',
      description: 'Distrito de San Salvador Este',
      active: true,
    },
  });
};
