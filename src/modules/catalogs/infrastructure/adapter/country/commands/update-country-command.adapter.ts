import { UpdateCountryCommand } from '@/modules/catalogs/application/country/commands/update-country/update-country.command';
import { UpdateCountryHandler } from '@/modules/catalogs/application/country/commands/update-country/update-country.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryCommandAdapter implements ICommandHandler<UpdateCountryCommand> {
  constructor(private readonly handler: UpdateCountryHandler) {}
  async execute(command: UpdateCountryCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
