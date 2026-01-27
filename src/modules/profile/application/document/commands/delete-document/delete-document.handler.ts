import { DocumentRepository } from '@/modules/profile/domain/repositories/document.repository';
import { DeleteDocumentCommand } from './delete-document.command';
import { DocumentId } from '@/modules/profile/domain/value-objects/document-value-object/document-id';

export class DeleteDocumentHandler {
  constructor(private readonly repository: DocumentRepository) {}

  async execute(command: DeleteDocumentCommand): Promise<void> {
    await this.repository.delete(new DocumentId(command.id));
  }
}
