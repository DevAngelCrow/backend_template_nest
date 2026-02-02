import { UpdateRouteCommand } from '@/modules/security/application/route/commands/update-route/update-route.command';
import { UpdateRouteHandler } from '@/modules/security/application/route/commands/update-route/update-route.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateRouteCommand)
export class UpdateRouteCommandAdapter implements ICommandHandler<UpdateRouteCommand> {
  constructor(private readonly handler: UpdateRouteHandler) {}
  async execute(command: UpdateRouteCommand) {
    return this.handler.execute(command);
  }
}
