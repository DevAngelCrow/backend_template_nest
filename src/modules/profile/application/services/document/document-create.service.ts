import { DocumentCreate } from "../../use-cases/document/document-create";
import { DocumentDto } from "../../dtos/document.dto";
import { Document } from "@/modules/profile/domain/entities/document";

export class DocumentCreateService {
    constructor(private readonly documentCreate: DocumentCreate) {}
    async run(document_dto: DocumentDto) : Promise<Document> {
        return await this.documentCreate.run(document_dto);
    }
}