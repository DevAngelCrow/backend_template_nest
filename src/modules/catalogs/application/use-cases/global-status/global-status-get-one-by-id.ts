import { GlobalStatus } from 'src/modules/catalogs/domain/entities/global-status';
import { GlobalStatsusRepository } from 'src/modules/catalogs/domain/repositories/global-status-repository';
import { GlobalStatusId } from 'src/modules/catalogs/domain/value-objects/goblal-status-value-object/global-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class GlobalStatusGetOneById {
  constructor(
    protected readonly globalStatusRepository: GlobalStatsusRepository,
  ) {}
  public async run(id: number): Promise<GlobalStatus | null> {
    const globalStatusId = new GlobalStatusId(id);
    const globalStatus =
      await this.globalStatusRepository.getOneById(globalStatusId);
    if (!globalStatus) {
      throw new NotFoundException('GlobalStatus', id.toString());
    }
    return globalStatus;
  }
}
