import { MaritalStatus } from 'src/modules/catalogs/domain/entities/marital-status';
import { MaritalStatusRepository } from 'src/modules/catalogs/domain/repositories/marital-status-repository';
import { MaritalStatusId } from 'src/modules/catalogs/domain/value-objects/marital-status-value-object/marital-status-id';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MaritalStatusGetOneById {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(id: number): Promise<MaritalStatus | null> {
    const maritalStatusId = new MaritalStatusId(id);
    const maritalStatus =
      await this.maritalStatusRepository.getOneById(maritalStatusId);
    if (!maritalStatus) {
      throw new NotFoundException('MaritalStatus', id.toString());
    }
    return maritalStatus;
  }
}
