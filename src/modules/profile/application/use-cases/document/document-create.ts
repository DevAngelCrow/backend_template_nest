import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { DocumentDto } from '../../dtos/document.dto';
import { Document } from 'src/modules/profile/domain/entities/document';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentCreate {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(document_dto: DocumentDto): Promise<void> {
    const document = Document.create({ ...document_dto });
    await this.documentRepository.create(document);
  }
}