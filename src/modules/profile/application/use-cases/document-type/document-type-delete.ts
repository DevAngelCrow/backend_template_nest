import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DocumentTypeRepository } from 'src/modules/profile/domain/repositories/document-type.repository';
import { DocumentTypeId } from 'src/modules/profile/domain/value-objects/document-type-value-object/document-type-id';

export class DocumentTypeDelete {
  constructor(
    protected readonly documentTypeRepository: DocumentTypeRepository,
  ) {}
  public async run(id: number): Promise<void> {
    const documentType = await this.documentTypeRepository.getOneById(
      new DocumentTypeId(id),
    );
    if (!documentType) {
      throw new NotFoundException('DocumentType', id.toString());
    }
    const documentTypeId = documentType.getId();
    if (!documentTypeId) {
      throw new Error(`DocumentType id is undefined`);
    }
    await this.documentTypeRepository.delete(documentTypeId);
  }
}
