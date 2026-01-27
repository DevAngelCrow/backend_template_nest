import { Pagination } from '@/shared/domain/value-object/pagination';
import { GetDocumentTypesQuery } from './get-document-types.query';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { DocumentTypeReadRepository } from '../../../repositories/document-type-read.repository';
import { DocumentType } from '@/modules/profile/domain/entities/document-type';

export class GetDocumentTypesHandler {
  constructor(private readonly repository: DocumentTypeReadRepository) {}
  async execute(
    query: GetDocumentTypesQuery,
  ): Promise<Pagination<DocumentType> | DocumentType[]> {
    if (query.pagination_params) {
      const paginationParams = PaginationParams.create({
        ...query.pagination_params,
      });
      return await this.repository.getAll(paginationParams, query.filter);
    }
    return await this.repository.getAll(undefined, query.filter);
  }
}
