import { GetRolByIdHandler } from '@/modules/security/application/rol/queries/get-rol-by-id/get-rol-by-id.handler';
import { GetRolByIdQuery } from '@/modules/security/application/rol/queries/get-rol-by-id/get-rol-by-id.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetRolByIdQuery)
export class GetRolByIdQueryAdapter implements IQueryHandler<GetRolByIdQuery> {
  constructor(private readonly handler: GetRolByIdHandler) {}
  async execute(query: GetRolByIdQuery) {
    return this.handler.execute(query);
  }
}
