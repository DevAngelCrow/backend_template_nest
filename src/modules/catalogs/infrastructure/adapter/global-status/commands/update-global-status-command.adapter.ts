import { UpdateGlobalStatusCommand } from '@/modules/catalogs/application/global-status/commands/update-global-status/update-global-status.command';
import { UpdateGlobalStatusHandler } from '@/modules/catalogs/application/global-status/commands/update-global-status/update-global-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateGlobalStatusCommand)
export class UpdateGlobalStatusCommandAdapter implements ICommandHandler<UpdateGlobalStatusCommand> {
  constructor(private readonly handler: UpdateGlobalStatusHandler) {}
  async execute(command: UpdateGlobalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
