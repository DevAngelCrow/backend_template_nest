import { UpdateDocumentTypeCommand } from '@/modules/profile/application/document-type/commands/update-document-type/update-document-type.command';
import { UpdateDocumentTypeHandler } from '@/modules/profile/application/document-type/commands/update-document-type/update-document-type.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateDocumentTypeCommand)
export class UpdateDocumentTypeCommandAdapter implements ICommandHandler<UpdateDocumentTypeCommand> {
  constructor(private readonly handler: UpdateDocumentTypeHandler) {}
  async execute(command: UpdateDocumentTypeCommand) {
    return this.handler.execute(command);
  }
}
