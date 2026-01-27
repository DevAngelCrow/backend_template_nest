import { GetDocumentTypesHandler } from '@/modules/profile/application/document-type/queries/get-document-types/get-document-types.handler';
import { GetDocumentTypesQuery } from '@/modules/profile/application/document-type/queries/get-document-types/get-document-types.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetDocumentTypesQuery)
export class GetDocumentTypesQueryAdapter implements IQueryHandler<GetDocumentTypesQuery> {
  constructor(private readonly handler: GetDocumentTypesHandler) {}
  async execute(query: GetDocumentTypesQuery) {
    return this.handler.execute(query);
  }
}
