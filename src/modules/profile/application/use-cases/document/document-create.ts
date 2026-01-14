import { DocumentRepository } from 'src/modules/profile/domain/repositories/document.repository';
import { DocumentDto } from '../../dtos/document.dto';
import { Document } from 'src/modules/profile/domain/entities/document';

export class DocumentCreate {
  constructor(protected readonly documentRepository: DocumentRepository) {}
  public async run(document_dto: DocumentDto): Promise<Document> {
    const document = Document.create({ ...document_dto });
    return await this.documentRepository.create(document);
  }
}
