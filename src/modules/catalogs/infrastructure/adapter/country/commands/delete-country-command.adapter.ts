import { DeleteCountryCommand } from '@/modules/catalogs/application/country/commands/delete-country/delete-country.command';
import { DeleteCountryHandler } from '@/modules/catalogs/application/country/commands/delete-country/delete-country.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryCommandAdapter implements ICommandHandler<DeleteCountryCommand> {
  constructor(private readonly handler: DeleteCountryHandler) {}
  async execute(command: DeleteCountryCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
