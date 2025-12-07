import { PrismaService } from 'src/shared/infrastructure/persistence/prisma/prisma.service';
import { TransactionContextService } from '@/shared/infrastructure/services/transaction-context.service';
import { UserRepository } from '../../domain/repositories/user-repository';
import { User } from '../../domain/entities/user';
//import { UserId } from '../../domain/value-objects/user-value-object/user-id';
import { UserName } from '../../domain/value-objects/user-value-object/user-name';
import { DatabaseException } from '@/shared/infrastructure/exceptions/database.exception';
import { Injectable } from '@nestjs/common';
import { PasswordHasher } from '@/modules/auth/infrastructure/services/password-hasher.service';
import { mnt_user } from 'generated/prisma/client';

@Injectable()
export class ImplUserRepository implements UserRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly transactionContext: TransactionContextService,
  ) {}

  private getPrismaClient() {
    return this.transactionContext.getTransaction() ?? this.prisma;
  }
  async create(user: User): Promise<User> {
    try {
      const prisma = this.getPrismaClient();
      const passwordHasher = new PasswordHasher();
      const hashedPassword = await passwordHasher.hash(
        user.getPassword().value(),
      );
      const userCreatedPrisma = await prisma.mnt_user.create({
        data: {
          id_people: user.getIdPeople().value(),
          user_name: user.getUserName().value(),
          password: hashedPassword,
          id_status: user.getIdStatus().value(),
          last_access: new Date(user.getLastAccess().value()),
          is_validated: user.getIsValidated().value(),
        },
      });
      const userEntityCreated = User.create({
        id: Number(userCreatedPrisma.id),
        id_people: Number(userCreatedPrisma.id_people),
        user_name: userCreatedPrisma.user_name,
        password: userCreatedPrisma.password,
        id_status: Number(userCreatedPrisma.id_status),
        last_access: userCreatedPrisma.last_access,
        is_validated: userCreatedPrisma.is_validated,
      });
      return userEntityCreated;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error creating user: ${error.message}`);
      }
      throw new DatabaseException('Error creating user', 'create');
    }
  }
  //   public update(user: User): Promise<void> {
  //     throw new Error('Method not implemented.');
  //   }
  //   public getOneById(id: UserId): Promise<User | null> {
  //     throw new Error('Method not implemented.');
  //   }
  async getOneByUserName(user_name: UserName): Promise<User | null> {
    try {
      const prisma = this.getPrismaClient();
      const userDb: mnt_user | null = await prisma.mnt_user.findFirst({
        where: {
          user_name: user_name.value(),
        },
      });
      if (!userDb) {
        return null;
      }
      const userEntity = User.create({
        id: Number(userDb.id),
        id_people: Number(userDb.id_people),
        user_name: userDb.user_name,
        password: userDb.password,
        id_status: Number(userDb.id_status),
        last_access: userDb.last_access,
        is_validated: userDb.is_validated,
      });
      return userEntity;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error getting user by user_name: ${error.message}`);
      }
      throw new DatabaseException(
        'Error getting user by user_name',
        'getOneByUserName',
      );
    }
  }
}
