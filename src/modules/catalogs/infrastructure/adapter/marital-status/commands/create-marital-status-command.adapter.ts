import { CreateMaritalStatusCommand } from '@/modules/catalogs/application/marital-status/commands/create-marital-status/create-marital-status.command';
import { CreateMaritalStatusHandler } from '@/modules/catalogs/application/marital-status/commands/create-marital-status/create-marital-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateMaritalStatusCommand)
export class CreateMaritalStatusCommandAdapter implements ICommandHandler<CreateMaritalStatusCommand> {
  constructor(private readonly handler: CreateMaritalStatusHandler) {}
  async execute(command: CreateMaritalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
