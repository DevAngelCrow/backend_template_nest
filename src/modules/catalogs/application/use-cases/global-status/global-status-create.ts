import { GlobalStatsusRepository } from '@/modules/catalogs/domain/repositories/global-status-repository';
import { GlobalStatusDto } from '../../dtos/global-status.dto';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';

export class GlobalStatusCreate {
  constructor(
    protected readonly globalStatusRepository: GlobalStatsusRepository,
  ) {}
  public async run(global_status_dto: GlobalStatusDto): Promise<void> {
    const globalStatus = GlobalStatus.create({ ...global_status_dto });
    await this.globalStatusRepository.create(globalStatus);
  }
}
