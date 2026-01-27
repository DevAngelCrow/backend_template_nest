import { DeleteDepartmentCommand } from '@/modules/catalogs/application/department/commands/delete-department/delete-department.command';
import { DeleteDepartmentHandler } from '@/modules/catalogs/application/department/commands/delete-department/delete-department.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteDepartmentCommand)
export class DeleteDepartmentCommandAdapter implements ICommandHandler<DeleteDepartmentCommand> {
  constructor(private readonly handler: DeleteDepartmentHandler) {}
  async execute(command: DeleteDepartmentCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
