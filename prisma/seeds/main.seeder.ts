import { seedCtlStatus } from './ctl-status.seeder';
import { seedCtlCountry } from './ctl-country.seeder';
import { seedCtlDepartment } from './ctl-department.seeder';
import { seedCtlMunicipality } from './ctl-municipality.seeder';
import { seedCtlDistrict } from './ctl-district.seeder';
import { seedCtlMaritalStatus } from './ctl-marital-status.seeder';
import { seedCtlGender } from './ctl-gender.seeder';
import { seedCtlDocumentType } from './ctl-document-type.seeder';
import { seedMntPeople } from './mnt-people.seeder';
import { seedCtlProviderStorage } from './ctl-provider-storage.seeder';
import { seedMntuser } from './mnt-user.seeder';
import { seedCtlCategoryPermissions } from './ctl-category-permissions.seeder';
import { seedCtlPermissions } from './ctl-permissions.seeder';
import { seedMntRol } from './mnt-rol.seeder';
import { seedRolPermissions } from './rol-permissions.seeder';
import { seedMntUserRol } from './mnt-user-rol.seeder';
import { seedMntRoute } from './mnt-route.seeder';
import { seedMntRoutePermissions } from './mnt-route-permissions.seeder';
import { seedMntAddress } from './mnt-address.seeder';
import { PrismaClient } from 'generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DB_PROVIDER}://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?schema=public`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const mainSeeder = async () => {
  console.log('Starting main seeder...');

  console.log('Database connected.');
  try {
    await seedCtlStatus(prisma);
    await seedCtlCountry(prisma);
    await seedCtlDepartment(prisma);
    await seedCtlMunicipality(prisma);
    await seedCtlDistrict(prisma);
    await seedCtlMaritalStatus(prisma);
    await seedCtlGender(prisma);
    await seedCtlDocumentType(prisma);
    await seedMntPeople(prisma);
    await seedCtlProviderStorage(prisma);
    await seedMntuser(prisma);
    await seedCtlCategoryPermissions(prisma);
    await seedCtlPermissions(prisma);
    await seedMntRol(prisma);
    await seedRolPermissions(prisma);
    await seedMntUserRol(prisma);
    await seedMntRoute(prisma);
    await seedMntRoutePermissions(prisma);
    await seedMntAddress(prisma);
    console.log('Main seeder completed.');
  } catch (error) {
    console.error('Error during main seeder execution:', error);
    throw error;
  }
};
mainSeeder()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
