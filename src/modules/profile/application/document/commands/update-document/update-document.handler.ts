import { DocumentRepository } from '@/modules/profile/domain/repositories/document.repository';
import { UpdateDocumentCommand } from './update-document.command';
import { Document } from '@/modules/profile/domain/entities/document';
import { DocumentId } from '@/modules/profile/domain/value-objects/document-value-object/document-id';

export class UpdateDocumentHandler {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(command: UpdateDocumentCommand): Promise<void> {
    const document = Document.create({ ...command.document_dto });
    await this.repository.update(new DocumentId(command.document_dto.id), document);
  }
}
