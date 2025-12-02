import { MaritalStatusRepository } from '@/modules/catalogs/domain/repositories/marital-status-repository';
import { MaritalStatusId } from '@/modules/catalogs/domain/value-objects/marital-status-value-object/marital-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaritalStatusDelete {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(id: number): Promise<void> {
    const maritalStatus = await this.maritalStatusRepository.getOneById(
      new MaritalStatusId(id),
    );
    if (!maritalStatus) {
      throw new NotFoundException('MaritalStatus', id.toString());
    }
    const maritalStatusId = maritalStatus.getId();
    if (!maritalStatusId) {
      throw new Error(`MaritalStatus id is undefined`);
    }
    await this.maritalStatusRepository.delete(maritalStatusId);
  }
}
