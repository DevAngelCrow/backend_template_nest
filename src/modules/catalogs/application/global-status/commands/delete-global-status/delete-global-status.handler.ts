import { GlobalStatsusRepository } from '@/modules/catalogs/domain/repositories/global-status-repository';
import { DeleteGlobalStatusCommand } from './delete-global-status.command';
import { GlobalStatusId } from '@/modules/catalogs/domain/value-objects/goblal-status-value-object/global-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { GlobalStatusQueriesRepository } from '../../../repositories/global-status-read.repository';

export class DeleteGlobalStatusHandler {
  constructor(
    private readonly repository: GlobalStatsusRepository,
    private readonly readRepository: GlobalStatusQueriesRepository,
  ) {}
  async execute(command: DeleteGlobalStatusCommand): Promise<void> {
    const globalStatus = await this.readRepository.getOneById(
      new GlobalStatusId(command.id),
    );
    if (!globalStatus) {
      throw new NotFoundException('GlobalStatus', command.id.toString());
    }
    const globalStatusId = globalStatus.getId();
    if (!globalStatusId) {
      throw new Error(`GlobalStatus id is undefined`);
    }
    await this.repository.delete(globalStatusId);
  }
}
