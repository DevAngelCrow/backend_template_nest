import { GetDocumentTypeByIdHandler } from '@/modules/profile/application/document-type/queries/get-document-type-by-id/get-document-type-by-id.handler';
import { GetDocumentTypeByIdQuery } from '@/modules/profile/application/document-type/queries/get-document-type-by-id/get-document-type-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDocumentTypeByIdQuery)
export class GetDocumentTypeByIdQueryAdapter implements IQueryHandler<GetDocumentTypeByIdQuery> {
  constructor(private readonly handler: GetDocumentTypeByIdHandler) {}
  async execute(query: GetDocumentTypeByIdQuery) {
    return this.handler.execute(query);
  }
}
