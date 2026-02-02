import { DocumentRepository } from '@/modules/profile/domain/repositories/document.repository';
import { CreateDocumentCommand } from './create-document.command';
import { Document } from '@/modules/profile/domain/entities/document';

export class CreateDocumentHandler {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(command: CreateDocumentCommand): Promise<Document> {
    const document = Document.create({ ...command.document_dto });
    return await this.repository.create(document);
  }
}
