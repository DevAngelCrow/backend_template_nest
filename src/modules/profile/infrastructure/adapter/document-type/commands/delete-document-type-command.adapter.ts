import { DeleteDocumentTypeCommand } from '@/modules/profile/application/document-type/commands/delete-document-type/delete-document-type.command';
import { DeleteDocumentTypeHandler } from '@/modules/profile/application/document-type/commands/delete-document-type/delete-document-type.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(DeleteDocumentTypeCommand)
export class DeleteDocumentTypeCommandAdapter implements ICommandHandler<DeleteDocumentTypeCommand> {
  constructor(private readonly handler: DeleteDocumentTypeHandler) {}
  async execute(command: DeleteDocumentTypeCommand) {
    return this.handler.execute(command);
  }
}
