import { UpdateMaritalStatusCommand } from '@/modules/catalogs/application/marital-status/commands/update-marital-status/update-marital-status.command';
import { UpdateMaritalStatusHandler } from '@/modules/catalogs/application/marital-status/commands/update-marital-status/update-marital-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateMaritalStatusCommand)
export class UpdateMaritalStatusCommandAdapter implements ICommandHandler<UpdateMaritalStatusCommand> {
  constructor(private readonly handler: UpdateMaritalStatusHandler) {}
  async execute(command: UpdateMaritalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
