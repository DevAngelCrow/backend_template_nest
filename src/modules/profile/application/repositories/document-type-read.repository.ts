import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';
import { DocumentTypeId } from '../../domain/value-objects/document-type-value-object/document-type-id';
import { DocumentType } from '../../domain/entities/document-type';

export abstract class DocumentTypeReadRepository {
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<DocumentType> | DocumentType[]>;
  abstract getOneById(id: DocumentTypeId): Promise<DocumentType | null>;
}
