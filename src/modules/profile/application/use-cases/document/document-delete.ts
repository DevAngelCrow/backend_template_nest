import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { DocumentId } from 'src/modules/profile/domain/value-objects/document-value-object/document-id';

export class DocumentDelete {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(id: number): Promise<void> {
    const document = await this.documentRepository.getOneById(
      new DocumentId(id),
    );
    if (!document) {
      throw new NotFoundException('Document', id.toString());
    }
    const documentId = document.getId();
    if (!documentId) {
      throw new Error(`Document id is undefined`);
    }
    await this.documentRepository.delete(documentId);
  }
}
