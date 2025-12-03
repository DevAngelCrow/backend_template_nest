import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { PrismaClient } from 'generated/prisma/client';

type TransactionClient = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
>;
@Injectable()
export class TransactionContextService {
  private storage = new AsyncLocalStorage<TransactionClient>();
  getTransaction(): TransactionClient | undefined {
    return this.storage.getStore();
  }

  async run<T>(transaction: unknown, callback: () => Promise<T>): Promise<T> {
    return await this.storage.run(
      transaction as TransactionClient,
      async () => {
        return await callback();
      },
    );
  }
}
