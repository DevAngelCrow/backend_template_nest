import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Document } from 'src/modules/profile/domain/entities/document';
import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { DocumentId } from 'src/modules/profile/domain/value-objects/document-value-object/document-id';

export class DocumentGetOneById {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(id: number): Promise<Document | null> {
    const documentId = new DocumentId(id);
    const document = await this.documentRepository.getOneById(documentId);
    if (!document) {
      throw new NotFoundException('Document', id.toString());
    }
    return document;
  }
}
