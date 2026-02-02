import { PrismaClient } from 'generated/prisma/client';

export const seedMntAddress = async (tx: PrismaClient) => {
  console.log('Seeding mnt_address data ...');
  const people = await tx.mnt_people.findFirst({
    where: { id: 1 },
  });
  const district = await tx.ctl_district.findFirst({
    where: { id: 1 },
  });
  if (!people || !district) {
    throw new Error('Please seed mnt_person and mnt_district first.');
  }
  await tx.mnt_address.create({
    data: {
      id_people: people.id,
      street: 'Calle test',
      street_number: '125',
      neighborhood: 'Residencial test',
      id_district: district.id,
      house_number: '78',
      block: 'J',
      pathway: 'pasaje test',
      current: true,
      active: true,
    },
  });
};
