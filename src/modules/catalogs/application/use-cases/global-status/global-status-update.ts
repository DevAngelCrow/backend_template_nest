import { GlobalStatsusRepository } from '@/modules/catalogs/domain/repositories/global-status-repository';
import { GlobalStatusDto } from '../../dtos/global-status.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';

export class GlobalStatusUpdate {
  constructor(
    protected readonly globalStatusRepository: GlobalStatsusRepository,
  ) {}
  public async run(global_status_dto: GlobalStatusDto): Promise<void> {
    const globalStatus = GlobalStatus.create({ ...global_status_dto });
    const globalStatusId = globalStatus.getId();
    if (!globalStatusId) {
      throw new Error(`GlobalStatus id is undefined`);
    }
    const foundGlobalStatus =
      await this.globalStatusRepository.getOneById(globalStatusId);
    if (!foundGlobalStatus) {
      throw new NotFoundException(
        'GlobalStatus',
        globalStatusId.value().toString(),
      );
    }
    await this.globalStatusRepository.update(globalStatus);
  }
}
