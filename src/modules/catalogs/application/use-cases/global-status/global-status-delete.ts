import { GlobalStatsusRepository } from '@/modules/catalogs/domain/repositories/global-status-repository';
import { GlobalStatusId } from '@/modules/catalogs/domain/value-objects/goblal-status-value-object/global-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class GlobalStatusDelete {
  constructor(
    protected readonly globalStatusRepository: GlobalStatsusRepository,
  ) {}
  public async run(id: number): Promise<void> {
    const globalStatus = await this.globalStatusRepository.getOneById(
      new GlobalStatusId(id),
    );
    if (!globalStatus) {
      throw new NotFoundException('GlobalStatus', id.toString());
    }
    const globalStatusId = globalStatus.getId();
    if (!globalStatusId) {
      throw new Error(`GlobalStatus id is undefined`);
    }
    await this.globalStatusRepository.delete(globalStatusId);
  }
}
