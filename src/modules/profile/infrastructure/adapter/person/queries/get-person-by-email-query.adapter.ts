import { GetPersonByEmailHandler } from '@/modules/profile/application/person/queries/get-person-by-email/get-person-by-email.handler';
import { GetPersonByEmailQuery } from '@/modules/profile/application/person/queries/get-person-by-email/get-person-by-email.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetPersonByEmailQuery)
export class GetPersonByEmailQueryAdapter implements IQueryHandler<GetPersonByEmailQuery> {
  constructor(private readonly handler: GetPersonByEmailHandler) {}
  async execute(query: GetPersonByEmailQuery) {
    return this.handler.execute(query);
  }
}
