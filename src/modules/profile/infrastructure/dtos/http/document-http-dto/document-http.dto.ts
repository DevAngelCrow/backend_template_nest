import { Document } from 'src/modules/profile/domain/entities/document';

export class DocumentHttpDto {
  constructor(
    public readonly number_document: string,
    public readonly description: string,
    public readonly id_people: number,
    public readonly id_type_document: number,
    public readonly active: boolean,
    public readonly id?: number,
  ) {}
  public static fromEntity(document: Document): DocumentHttpDto {
    return new DocumentHttpDto(
      document.getNumberDocument().value(),
      document.getDescription().value(),
      document.getIdPeople().value(),
      document.getIdTypeDocument().value(),
      document.getActive().value(),
      document.getId() ? document.getId()?.value() : undefined,
    );
  }
}
