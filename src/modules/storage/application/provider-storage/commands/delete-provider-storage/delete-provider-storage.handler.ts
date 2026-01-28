import { ProviderStorageRepository } from '@/modules/storage/domain/repositories/provider-storage.repository';
import { DeleteProviderStorageCommand } from './delete-provider-storage.command';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { ProviderStorageId } from '@/modules/storage/domain/value-objects/provider-storage-value-object/provider-storage-id';
import { ProviderStorageQueriesRepository } from '../../../repositories/provider-storage-read.repository';

export class DeleteProviderStorageHandler {
  constructor(
    private readonly repository: ProviderStorageRepository,
    private readonly queriesRepository: ProviderStorageQueriesRepository,
  ) {}

  async execute(command: DeleteProviderStorageCommand): Promise<void> {
    const id = new ProviderStorageId(command.id);
    const existingProviderStorage = await this.queriesRepository.getOneById(id);

    if (!existingProviderStorage) {
      throw new NotFoundException(
        'Provider storage not found',
        id.value().toString(),
      );
    }

    await this.repository.delete(id);
  }
}
