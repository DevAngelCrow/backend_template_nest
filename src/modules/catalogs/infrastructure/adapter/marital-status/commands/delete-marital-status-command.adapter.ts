import { DeleteMaritalStatusCommand } from '@/modules/catalogs/application/marital-status/commands/delete-marital-status/delete-marital-status.command';
import { DeleteMaritalStatusHandler } from '@/modules/catalogs/application/marital-status/commands/delete-marital-status/delete-marital-status.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteMaritalStatusCommand)
export class DeleteMaritalStatusCommandAdapter implements ICommandHandler<DeleteMaritalStatusCommand> {
  constructor(private readonly handler: DeleteMaritalStatusHandler) {}
  async execute(command: DeleteMaritalStatusCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
