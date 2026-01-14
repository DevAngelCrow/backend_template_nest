import { DocumentType } from 'src/modules/profile/domain/entities/document-type';

export class DocumentTypeHttpDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly active: boolean,
    public readonly mask?: string,
    public readonly id?: number,
  ) {}
  public static fromEntity(documentType: DocumentType): DocumentTypeHttpDto {
    return new DocumentTypeHttpDto(
      documentType.getName().value(),
      documentType.getDescription().value(),
      documentType.getActive().value(),
      documentType.getMask()?.value(),
      documentType.getId() ? documentType.getId()?.value() : undefined,
    );
  }
}
