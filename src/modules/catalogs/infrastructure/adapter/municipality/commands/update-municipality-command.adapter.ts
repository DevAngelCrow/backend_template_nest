import { UpdateMunicipalityCommand } from '@/modules/catalogs/application/municipality/commands/update-municipality/update-municipality.command';
import { UpdateMunicipalityHandler } from '@/modules/catalogs/application/municipality/commands/update-municipality/update-municipality.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateMunicipalityCommand)
export class UpdateMunicipalityCommandAdapter implements ICommandHandler<UpdateMunicipalityCommand> {
  constructor(private readonly handler: UpdateMunicipalityHandler) {}
  async execute(command: UpdateMunicipalityCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
