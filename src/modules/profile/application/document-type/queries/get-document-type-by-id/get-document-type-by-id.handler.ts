import { DocumentTypeId } from '@/modules/profile/domain/value-objects/document-type-value-object/document-type-id';
import { GetDocumentTypeByIdQuery } from './get-document-type-by-id.query';
import { DocumentTypeReadRepository } from '../../../repositories/document-type-read.repository';

export class GetDocumentTypeByIdHandler {
  constructor(private readonly repository: DocumentTypeReadRepository) {}
  async execute(query: GetDocumentTypeByIdQuery) {
    return await this.repository.getOneById(new DocumentTypeId(query.id));
  }
}
