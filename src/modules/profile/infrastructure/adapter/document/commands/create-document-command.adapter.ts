import { CreateDocumentCommand } from '@/modules/profile/application/document/commands/create-document/create-document.command';
import { CreateDocumentHandler } from '@/modules/profile/application/document/commands/create-document/create-document.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateDocumentCommand)
export class CreateDocumentCommandAdapter implements ICommandHandler<CreateDocumentCommand> {
  constructor(private readonly handler: CreateDocumentHandler) {}
  async execute(command: CreateDocumentCommand) {
    return this.handler.execute(command);
  }
}
