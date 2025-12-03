import { DocumentTypeRepository } from 'src/modules/profile/domain/repositories/document-type.repository';
import { DocumentTypeDto } from '../../dtos/document-type.dto';
import { DocumentType } from 'src/modules/profile/domain/entities/document-type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentTypeCreate {
  constructor(
    protected readonly documentTypeRepository: DocumentTypeRepository,
  ) {}
  public async run(document_type_dto: DocumentTypeDto): Promise<void> {
    const documentType = DocumentType.create({ ...document_type_dto });
    await this.documentTypeRepository.create(documentType);
  }
}