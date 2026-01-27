import { GetDocumentsHandler } from '@/modules/profile/application/document/queries/get-documents/get-documents.handler';
import { GetDocumentsQuery } from '@/modules/profile/application/document/queries/get-documents/get-documents.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDocumentsQuery)
export class GetDocumentsQueryAdapter implements IQueryHandler<GetDocumentsQuery> {
  constructor(private readonly handler: GetDocumentsHandler) {}
  async execute(query: GetDocumentsQuery) {
    return this.handler.execute(query);
  }
}
