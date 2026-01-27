import { CreateMunicipalityCommand } from '@/modules/catalogs/application/municipality/commands/create-municipality/create-municipality.command';
import { CreateMunicipalityHandler } from '@/modules/catalogs/application/municipality/commands/create-municipality/create-municipality.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateMunicipalityCommand)
export class CreateMunicipalityCommandAdapter implements ICommandHandler<CreateMunicipalityCommand> {
  constructor(private readonly handler: CreateMunicipalityHandler) {}
  async execute(command: CreateMunicipalityCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
