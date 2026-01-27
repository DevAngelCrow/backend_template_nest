import { DeleteGlobalStatusCommand } from '@/modules/catalogs/application/global-status/commands/delete-global-status/delete-global-status.command';
import { DeleteGlobalStatusHandler } from '@/modules/catalogs/application/global-status/commands/delete-global-status/delete-global-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteGlobalStatusCommand)
export class DeleteGlobalStatusCommandAdapter implements ICommandHandler<DeleteGlobalStatusCommand> {
  constructor(private readonly handler: DeleteGlobalStatusHandler) {}
  async execute(command: DeleteGlobalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
