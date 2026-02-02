import { CreateDepartmentCommand } from '@/modules/catalogs/application/department/commands/create-department/create-department.command';
import { CreateDepartmentHandler } from '@/modules/catalogs/application/department/commands/create-department/create-department.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentCommandAdapter implements ICommandHandler<CreateDepartmentCommand> {
  constructor(private readonly handler: CreateDepartmentHandler) {}
  async execute(command: CreateDepartmentCommand): Promise<void> {
    return this.handler.execute(command);
  }
}
