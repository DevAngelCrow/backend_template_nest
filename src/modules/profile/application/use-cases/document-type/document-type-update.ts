import { DocumentTypeRepository } from 'src/modules/profile/domain/repositories/document-type.repository';
import { DocumentTypeDto } from '../../dtos/document-type.dto';
import { DocumentType } from 'src/modules/profile/domain/entities/document-type';
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

@Injectable()
export class DocumentTypeUpdate {
  constructor(
    protected readonly documentTypeRepository: DocumentTypeRepository,
  ) {}
  public async run(document_type_dto: DocumentTypeDto): Promise<void> {
    const documentType = DocumentType.create({ ...document_type_dto });
    const documentTypeId = documentType.getId();
    if (!documentTypeId) {
      throw new Error(`DocumentType id is undefined`);
    }
    const foundDocumentType =
      await this.documentTypeRepository.getOneById(documentTypeId);
    if (!foundDocumentType) {
      throw new NotFoundException(
        'DocumentType',
        documentTypeId.value().toString(),
      );
    }
    await this.documentTypeRepository.update(documentType);
  }
}