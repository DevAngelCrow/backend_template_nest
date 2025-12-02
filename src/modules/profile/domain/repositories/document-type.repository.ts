import { DocumentType } from '../entities/document-type';
import { DocumentTypeId } from '../value-objects/document-type-value-object/document-type-id';

export abstract class DocumentTypeRepository {
  abstract create(documentType: DocumentType): Promise<void>;
  abstract update(documentType: DocumentType): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ documentTypes: DocumentType[]; total: number }>;
  abstract getOneById(id: DocumentTypeId): Promise<DocumentType | null>;
  abstract delete(id: DocumentTypeId): Promise<void>;
}
