import { Document } from 'src/modules/profile/domain/entities/document';
import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export class DocumentGetAll {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(
    pagination_params?: PaginationParamsDto,
    filter?: string,
  ): Promise<Pagination<Document> | Document[]> {
    if (pagination_params) {
      const paginationParams = PaginationParams.create({
        ...pagination_params,
      });
      return await this.documentRepository.getAll(paginationParams, filter);
    }
    return await this.documentRepository.getAll(undefined, filter);
  }
}
