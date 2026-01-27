import { GetPeopleHandler } from '@/modules/profile/application/person/queries/get-people/get-people.handler';
import { GetPeopleQuery } from '@/modules/profile/application/person/queries/get-people/get-people.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPeopleQuery)
export class GetPeopleQueryAdapter implements IQueryHandler<GetPeopleQuery> {
  constructor(private readonly handler: GetPeopleHandler) {}
  async execute(query: GetPeopleQuery) {
    return this.handler.execute(query);
  }
}
