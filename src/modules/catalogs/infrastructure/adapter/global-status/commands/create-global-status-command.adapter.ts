import { CreateGlobalStatusCommand } from '@/modules/catalogs/application/global-status/commands/create-global-status/create-global-status.command';
import { CreateGlobalStatusHandler } from '@/modules/catalogs/application/global-status/commands/create-global-status/create-global-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateGlobalStatusCommand)
export class CreateGlobalStatusCommandAdapter implements ICommandHandler<CreateGlobalStatusCommand> {
  constructor(private readonly handler: CreateGlobalStatusHandler) {}
  async execute(command: CreateGlobalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
