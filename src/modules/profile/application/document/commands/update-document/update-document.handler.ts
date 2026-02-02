import { DocumentRepository } from '@/modules/profile/domain/repositories/document.repository';
import { UpdateDocumentCommand } from './update-document.command';
import { Document } from '@/modules/profile/domain/entities/document';

export class UpdateDocumentHandler {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(command: UpdateDocumentCommand): Promise<void> {
    const document = Document.create({ ...command.document_dto });
    await this.repository.update(document);
  }
}
