import { DeleteMunicipalityCommand } from '@/modules/catalogs/application/municipality/commands/delete-municipality/delete-municipality.command';
import { DeleteMunicipalityHandler } from '@/modules/catalogs/application/municipality/commands/delete-municipality/delete-municipality.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteMunicipalityCommand)
export class DeleteMunicipalityCommandAdapter implements ICommandHandler<DeleteMunicipalityCommand> {
  constructor(private readonly handler: DeleteMunicipalityHandler) {}
  async execute(command: DeleteMunicipalityCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
