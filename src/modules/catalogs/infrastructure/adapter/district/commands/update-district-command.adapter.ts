import { UpdateDistrictCommand } from '@/modules/catalogs/application/district/commands/update-district/update-district.command';
import { UpdateDistrictHandler } from '@/modules/catalogs/application/district/commands/update-district/update-district.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateDistrictCommand)
export class UpdateDistrictCommandAdapter implements ICommandHandler<UpdateDistrictCommand> {
  constructor(private readonly handler: UpdateDistrictHandler) {}
  async execute(command: UpdateDistrictCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
