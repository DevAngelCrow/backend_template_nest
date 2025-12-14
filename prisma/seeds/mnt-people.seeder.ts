import { PrismaClient } from 'generated/prisma/client';

export const seedMntPeople = async (tx: PrismaClient) => {
  console.log('Seeding mnt_people data ...');
  const gender = await tx.ctl_gender.findFirst({
    where: { id: 1 },
  });
  const maritalStatus = await tx.ctl_marital_status.findFirst({
    where: { id: 1 },
  });
  const status = await tx.ctl_status.findFirst({
    where: { table_header: 'mnt_people', id: 1 },
  });

  if (gender && maritalStatus && status) {
    await tx.mnt_people.create({
      data: {
        first_name: 'test',
        middle_name: 'test',
        last_name: 'test',
        birthdate: new Date('2025-01-01'),
        id_gender: gender.id,
        email: 'test@mail.com',
        id_marital_status: maritalStatus.id,
        img_path: 'test/test',
        phone: '22222222',
        id_status: status.id,
      },
    });
  }
};
