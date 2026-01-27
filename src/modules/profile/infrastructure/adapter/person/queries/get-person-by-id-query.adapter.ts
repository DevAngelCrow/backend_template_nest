import { GetPersonByIdHandler } from '@/modules/profile/application/person/queries/get-person-by-id/get-person-by-id.handler';
import { GetPersonByIdQuery } from '@/modules/profile/application/person/queries/get-person-by-id/get-person-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPersonByIdQuery)
export class GetPersonByIdQueryAdapter implements IQueryHandler<GetPersonByIdQuery> {
  constructor(private readonly handler: GetPersonByIdHandler) {}
  async execute(query: GetPersonByIdQuery) {
    return this.handler.execute(query);
  }
}
