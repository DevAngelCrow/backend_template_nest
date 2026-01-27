import { DeleteDistrictCommand } from '@/modules/catalogs/application/district/commands/delete-district/delete-district.command';
import { DeleteDistrictHandler } from '@/modules/catalogs/application/district/commands/delete-district/delete-district.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteDistrictCommand)
export class DeleteDistrictCommandAdapter implements ICommandHandler<DeleteDistrictCommand> {
  constructor(private readonly handler: DeleteDistrictHandler) {}
  async execute(command: DeleteDistrictCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
