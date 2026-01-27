import { GlobalStatus } from '@/modules/catalogs/domain/entities/global-status';
import { GetGlobalStatusQuery } from './get-global-status.query';
import { GlobalStatusId } from '@/modules/catalogs/domain/value-objects/goblal-status-value-object/global-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { GlobalStatusQueriesRepository } from '../../../repositories/global-status-read.repository';

export class GetGlobalStatusHandler {
  constructor(private readonly repository: GlobalStatusQueriesRepository) {}

  async execute(query: GetGlobalStatusQuery): Promise<GlobalStatus | null> {
    const globalStatusId = new GlobalStatusId(query.id_global_status);
    const globalStatus = await this.repository.getOneById(globalStatusId);
    if (!globalStatus) {
      throw new NotFoundException('GlobalStatus', query.id_global_status.toString());
    }
    return globalStatus;
  }
}
