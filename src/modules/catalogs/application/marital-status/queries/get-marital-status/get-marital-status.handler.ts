import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';
import { GetMaritalStatusQuery } from './get-marital-status.query';
import { MaritalStatusId } from '@/modules/catalogs/domain/value-objects/marital-status-value-object/marital-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { MaritalStatusQueriesRepository } from '../../../repositories/marital-status-read.repository';

export class GetMaritalStatusHandler {
  constructor(private readonly repository: MaritalStatusQueriesRepository) {}

  async execute(query: GetMaritalStatusQuery): Promise<MaritalStatus | null> {
    const maritalStatusId = new MaritalStatusId(query.id_marital_status);
    const maritalStatus = await this.repository.getOneById(maritalStatusId);
    if (!maritalStatus) {
      throw new NotFoundException('MaritalStatus', query.id_marital_status.toString());
    }
    return maritalStatus;
  }
}
