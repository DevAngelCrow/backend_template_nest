import { DeleteRouteCommand } from '@/modules/security/application/route/commands/delete-route/delete-route.command';
import { DeleteRouteHandler } from '@/modules/security/application/route/commands/delete-route/delete-route.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteRouteCommand)
export class DeleteRouteCommandAdapter implements ICommandHandler<DeleteRouteCommand> {
  constructor(private readonly handler: DeleteRouteHandler) {}
  async execute(command: DeleteRouteCommand) {
    return this.handler.execute(command);
  }
}
