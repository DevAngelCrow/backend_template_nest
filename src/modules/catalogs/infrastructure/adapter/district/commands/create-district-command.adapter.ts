import { CreateDistrictCommand } from '@/modules/catalogs/application/district/commands/create-district/create-district.command';
import { CreateDistrictHandler } from '@/modules/catalogs/application/district/commands/create-district/create-district.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateDistrictCommand)
export class CreateDistrictCommandAdapter implements ICommandHandler<CreateDistrictCommand> {
  constructor(private readonly handler: CreateDistrictHandler) {}
  async execute(command: CreateDistrictCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
