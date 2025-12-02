import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { PersonController } from './infrastructure/controllers/person.controller';
import { PersonCreate } from './application/use-cases/person/person-create';
import { PersonRepository } from './domain/repositories/person.repository';
import { ImplPersonRepository } from './infrastructure/implementation/impl-person.repository';
import { PersonGetAll } from './application/use-cases/person/person-get-all';
import { PersonGetOneByEmail } from './application/use-cases/person/person-get-one-by-email';
import { PersonGetOneById } from './application/use-cases/person/person-get-one-by-id';
import PersonUpdate from './application/use-cases/person/person-update';

@Module({
  imports: [
    RouterModule.register([{ path: 'profile', module: ProfileModule }]),
  ],
  controllers: [PersonController],
  providers: [
    PersonCreate,
    PersonGetAll,
    PersonGetOneByEmail,
    PersonUpdate,
    PersonGetOneById,
    { provide: PersonRepository, useClass: ImplPersonRepository },
  ],
  exports: [PersonCreate],
})
export class ProfileModule {}
