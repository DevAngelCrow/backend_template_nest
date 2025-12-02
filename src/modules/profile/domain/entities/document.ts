import { DocumentActive } from '../value-objects/document-value-object/document-active';
import { DocumentDescription } from '../value-objects/document-value-object/document-description';
import { DocumentId } from '../value-objects/document-value-object/document-id';
import { DocumentIdPerson } from '../value-objects/document-value-object/document-id-people';
import { DocumentIdTypeDocument } from '../value-objects/document-value-object/document-id-type-document';
import { DocumentNumberDoc } from '../value-objects/document-value-object/document-number-doc';

export class Document {
  constructor(
    private readonly number_document: DocumentNumberDoc,
    private readonly description: DocumentDescription,
    private readonly id_people: DocumentIdPerson,
    private readonly id_type_document: DocumentIdTypeDocument,
    private readonly active: DocumentActive,
    private readonly id?: DocumentId,
  ) {}
  static create(data: {
    id?: number;
    number_document: string;
    description: string;
    id_people: number;
    id_type_document: number;
    active: boolean;
  }): Document {
    return new Document(
      new DocumentNumberDoc(data.number_document),
      new DocumentDescription(data.description),
      new DocumentIdPerson(data.id_people),
      new DocumentIdTypeDocument(data.id_type_document),
      new DocumentActive(data.active),
      data.id ? new DocumentId(data.id) : undefined,
    );
  }
  getId(): DocumentId | undefined {
    return this.id;
  }
  getNumberDocument(): DocumentNumberDoc {
    return this.number_document;
  }
  getDescription(): DocumentDescription {
    return this.description;
  }
  getIdPeople(): DocumentIdPerson {
    return this.id_people;
  }
  getIdTypeDocument(): DocumentIdTypeDocument {
    return this.id_type_document;
  }
  getActive(): DocumentActive {
    return this.active;
  }
}
