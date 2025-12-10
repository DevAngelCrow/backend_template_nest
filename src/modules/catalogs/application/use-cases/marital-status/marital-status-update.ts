import { MaritalStatusRepository } from '@/modules/catalogs/domain/repositories/marital-status-repository';
import { MaritalStatusDto } from '../../dtos/marital-status.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';

export class MaritalStatusUpdate {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(marital_status_dto: MaritalStatusDto): Promise<void> {
    const maritalStatus = MaritalStatus.create({ ...marital_status_dto });
    const maritalStatusId = maritalStatus.getId();
    if (!maritalStatusId) {
      throw new Error(`MaritalStatus id is undefined`);
    }
    const foundMaritalStatus =
      await this.maritalStatusRepository.getOneById(maritalStatusId);
    if (!foundMaritalStatus) {
      throw new NotFoundException(
        'MaritalStatus',
        maritalStatusId.value().toString(),
      );
    }
    await this.maritalStatusRepository.update(maritalStatus);
  }
}
