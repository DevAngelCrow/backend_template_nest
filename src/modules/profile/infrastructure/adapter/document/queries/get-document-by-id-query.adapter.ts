import { GetDocumentByIdHandler } from '@/modules/profile/application/document/queries/get-document-by-id/get-document-by-id.handler';
import { GetDocumentByIdQuery } from '@/modules/profile/application/document/queries/get-document-by-id/get-document-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDocumentByIdQuery)
export class GetDocumentByIdQueryAdapter implements IQueryHandler<GetDocumentByIdQuery> {
  constructor(private readonly handler: GetDocumentByIdHandler) {}
  async execute(query: GetDocumentByIdQuery) {
    return this.handler.execute(query);
  }
}
