import { DocumentType } from 'src/modules/profile/domain/entities/document-type';
import { DocumentTypeRepository } from 'src/modules/profile/domain/repositories/document-type.repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
export class DocumentTypeGetAll {
  constructor(
    protected readonly documentTypeRepository: DocumentTypeRepository,
  ) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<DocumentType> | DocumentType[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.documentTypeRepository.getAll(paginationParams, filter);
    }
    return await this.documentTypeRepository.getAll(undefined, filter);
  }
}
