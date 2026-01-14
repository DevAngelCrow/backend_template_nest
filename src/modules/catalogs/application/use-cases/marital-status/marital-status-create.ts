import { MaritalStatusRepository } from '@/modules/catalogs/domain/repositories/marital-status-repository';
import { MaritalStatusDto } from '../../dtos/marital-status.dto';
import { MaritalStatus } from '@/modules/catalogs/domain/entities/marital-status';

export class MaritalStatusCreate {
  constructor(
    protected readonly maritalStatusRepository: MaritalStatusRepository,
  ) {}
  public async run(marital_status_dto: MaritalStatusDto): Promise<void> {
    const maritalStatus = MaritalStatus.create({ ...marital_status_dto });
    await this.maritalStatusRepository.create(maritalStatus);
  }
}
