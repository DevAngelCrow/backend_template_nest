import { CreateDocumentTypeCommand } from '@/modules/profile/application/document-type/commands/create-document-type/create-document-type.command';
import { CreateDocumentTypeHandler } from '@/modules/profile/application/document-type/commands/create-document-type/create-document-type.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateDocumentTypeCommand)
export class CreateDocumentTypeCommandAdapter implements ICommandHandler<CreateDocumentTypeCommand> {
  constructor(private readonly handler: CreateDocumentTypeHandler) {}
  async execute(command: CreateDocumentTypeCommand) {
    return this.handler.execute(command);
  }
}
