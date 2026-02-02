import { DocumentTypeRepository } from '@/modules/profile/domain/repositories/document-type.repository';
import { DeleteDocumentTypeCommand } from './delete-document-type.command';
import { DocumentTypeId } from '@/modules/profile/domain/value-objects/document-type-value-object/document-type-id';

export class DeleteDocumentTypeHandler {
  constructor(private readonly repository: DocumentTypeRepository) {}

  async execute(command: DeleteDocumentTypeCommand): Promise<void> {
    await this.repository.delete(new DocumentTypeId(command.id));
  }
}
