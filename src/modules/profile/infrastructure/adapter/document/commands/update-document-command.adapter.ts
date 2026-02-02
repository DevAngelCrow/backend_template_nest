import { UpdateDocumentCommand } from '@/modules/profile/application/document/commands/update-document/update-document.command';
import { UpdateDocumentHandler } from '@/modules/profile/application/document/commands/update-document/update-document.handler';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateDocumentCommand)
export class UpdateDocumentCommandAdapter implements ICommandHandler<UpdateDocumentCommand> {
  constructor(private readonly handler: UpdateDocumentHandler) {}
  async execute(command: UpdateDocumentCommand) {
    return this.handler.execute(command);
  }
}
