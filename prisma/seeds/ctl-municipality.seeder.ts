import { PrismaClient } from 'generated/prisma/client';

export const seedCtlMunicipality = async (tx: PrismaClient) => {
  console.log('Seeding ctl_municipality data ...');
  const department = await tx.ctl_department.findFirst({
    where: { id: 1 },
  });
  if (!department) {
    throw new Error(
      'Department with id 1 not found. Please seed ctl_department first.',
    );
  }
  await tx.ctl_municipality.create({
    data: {
      id_department: department.id,
      name: 'San Salvador Este',
      description: 'Municipio de San Salvador',
      active: true,
    },
  });
};
