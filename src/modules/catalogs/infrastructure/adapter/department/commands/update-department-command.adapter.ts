import { UpdateDepartmentCommand } from '@/modules/catalogs/application/department/commands/update-department/update-department.command';
import { UpdateDepartmentHandler } from '@/modules/catalogs/application/department/commands/update-department/update-department.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateDepartmentCommand)
export class UpdateDepartmentCommandAdapter implements ICommandHandler<UpdateDepartmentCommand> {
  constructor(private readonly handler: UpdateDepartmentHandler) {}
  async execute(command: UpdateDepartmentCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
