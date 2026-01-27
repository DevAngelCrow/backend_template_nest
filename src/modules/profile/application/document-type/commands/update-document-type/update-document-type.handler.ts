import { DocumentTypeRepository } from '@/modules/profile/domain/repositories/document-type.repository';
import { UpdateDocumentTypeCommand } from './update-document-type.command';
import { DocumentType } from '@/modules/profile/domain/entities/document-type';
import { DocumentTypeId } from '@/modules/profile/domain/value-objects/document-type-value-object/document-type-id';

export class UpdateDocumentTypeHandler {
  constructor(private readonly repository: DocumentTypeRepository) {}

  async execute(command: UpdateDocumentTypeCommand): Promise<void> {
    const documentType = DocumentType.create({ ...command.document_type_dto });
    await this.repository.update(new DocumentTypeId(command.document_type_dto.id), documentType);
  }
}
