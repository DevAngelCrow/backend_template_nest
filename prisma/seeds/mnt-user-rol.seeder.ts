import { PrismaClient } from 'generated/prisma/client';

export const seedMntUserRol = async (tx: PrismaClient) => {
  console.log('Seeding mnt_user_rol data ...');
  const user = await tx.mnt_user.findFirst({
    where: { id: 1 },
  });
  const rol = await tx.mnt_role.findFirst({
    where: { id: 1 },
  });
  if (!user || !rol) {
    throw new Error('Please seed mnt_user and mnt_role first.');
  }
  await tx.mnt_user_rol.create({
    data: {
      id_role: rol.id,
      id_user: user.id,
      created_at: new Date(),
    },
  });
};
