import { Document } from '../entities/document';
import { DocumentId } from '../value-objects/document-value-object/document-id';

export abstract class DocumentRepository {
  abstract create(document: Document): Promise<void>;
  abstract update(document: Document): Promise<void>;
  abstract getAll(
    page?: number,
    per_page?: number,
    filter?: string,
  ): Promise<{ documents: Document[]; total: number }>;
  abstract getOneById(id: DocumentId): Promise<Document | null>;
  abstract delete(id: DocumentId): Promise<void>;
}
