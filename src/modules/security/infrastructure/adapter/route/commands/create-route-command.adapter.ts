import { CreateRouteCommand } from '@/modules/security/application/route/commands/create-route/create-route.command';
import { CreateRouteHandler } from '@/modules/security/application/route/commands/create-route/create-route.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateRouteCommand)
export class CreateRouteCommandAdapter implements ICommandHandler<CreateRouteCommand> {
  constructor(private readonly handler: CreateRouteHandler) {}
  async execute(command: CreateRouteCommand) {
    return this.handler.execute(command);
  }
}
