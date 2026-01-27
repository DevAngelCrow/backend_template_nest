import { DeleteDocumentCommand } from '@/modules/profile/application/document/commands/delete-document/delete-document.command';
import { DeleteDocumentHandler } from '@/modules/profile/application/document/commands/delete-document/delete-document.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteDocumentCommand)
export class DeleteDocumentCommandAdapter implements ICommandHandler<DeleteDocumentCommand> {
  constructor(private readonly handler: DeleteDocumentHandler) {}
  async execute(command: DeleteDocumentCommand) {
    return this.handler.execute(command);
  }
}
