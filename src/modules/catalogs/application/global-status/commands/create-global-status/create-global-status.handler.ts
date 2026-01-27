import { GlobalStatsusRepository } from '@/modules/catalogs/domain/repositories/global-status-repository';
import { CreateGlobalStatusCommand } from './create-global-status.command';
import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';

export class CreateGlobalStatusHandler {
  constructor(private readonly repository: GlobalStatsusRepository) {}

  async execute(command: CreateGlobalStatusCommand): Promise<void> {
    const globalStatus = GlobalStatus.create({ ...command.global_status_dto });
    await this.repository.create(globalStatus);
  }
}
