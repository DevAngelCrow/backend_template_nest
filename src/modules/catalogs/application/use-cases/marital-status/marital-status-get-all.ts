import { MaritalStatus } from 'src/modules/catalogs/domain/entities/marital-status';
import { MaritalStatusRepository } from 'src/modules/catalogs/domain/repositories/marital-status-repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MaritalStatusGetAll {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ maritalStatuses: MaritalStatus[]; total: number }> {
    return await this.maritalStatusRepository.getAll(page, per_page, filter);
  }
}
