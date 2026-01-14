import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { DocumentType } from 'src/modules/profile/domain/entities/document-type';
import { DocumentTypeRepository } from 'src/modules/profile/domain/repositories/document-type.repository';
import { DocumentTypeId } from 'src/modules/profile/domain/value-objects/document-type-value-object/document-type-id';

export class DocumentTypeGetOneById {
  constructor(
    protected readonly documentTypeRepository: DocumentTypeRepository,
  ) {}
  public async run(id: number): Promise<DocumentType | null> {
    const documentTypeId = new DocumentTypeId(id);
    const documentType =
      await this.documentTypeRepository.getOneById(documentTypeId);
    if (!documentType) {
      throw new NotFoundException('DocumentType', id.toString());
    }
    return documentType;
  }
}
