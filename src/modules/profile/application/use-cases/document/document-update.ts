import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { DocumentDto } from '../../dtos/document.dto';
import { Document } from 'src/modules/profile/domain/entities/document';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

export class DocumentUpdate {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(document_dto: DocumentDto): Promise<void> {
    const document = Document.create({ ...document_dto });
    const documentId = document.getId();
    if (!documentId) {
      throw new Error(`Document id is undefined`);
    }
    const foundDocument = await this.documentRepository.getOneById(documentId);
    if (!foundDocument) {
      throw new NotFoundException('Document', documentId.value().toString());
    }
    await this.documentRepository.update(document);
  }
}
