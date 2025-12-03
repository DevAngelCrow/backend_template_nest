import { Pagination } from '@/shared/domain/value-object/pagination';
import { DocumentType } from '../entities/document-type';
import { DocumentTypeId } from '../value-objects/document-type-value-object/document-type-id';
import { PaginationParams } from '@/shared/domain/value-object/pagination-params';

export abstract class DocumentTypeRepository {
  abstract create(documentType: DocumentType): Promise<void>;
  abstract update(documentType: DocumentType): Promise<void>;
  abstract getAll(
    pagination_params?: PaginationParams,
    filter?: string,
  ): Promise<Pagination<DocumentType> | DocumentType[]>;
  abstract getOneById(id: DocumentTypeId): Promise<DocumentType | null>;
  abstract delete(id: DocumentTypeId): Promise<void>;
}
