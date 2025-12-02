import { GlobalStatus } from 'src/modules/catalogs/domain/entities/global-status';
import { GlobalStatsusRepository } from 'src/modules/catalogs/domain/repositories/global-status-repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class GlobalStatusGetAll {
  constructor(protected readonly globalStatusRepository: GlobalStatsusRepository) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ globalStatuses: GlobalStatus[]; total: number }> {
    return await this.globalStatusRepository.getAll(page, per_page, filter);
  }
}
