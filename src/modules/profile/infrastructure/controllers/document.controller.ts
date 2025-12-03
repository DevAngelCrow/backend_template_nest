import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DocumentCreate } from '../../application/use-cases/document/document-create';
import { CreateDocumentDto } from '../dtos/validators/document/create-document.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { DocumentUpdate } from '../../application/use-cases/document/document-update';
import { UpdateDocumentDto } from '../dtos/validators/document/update-document.dto';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';

import { DocumentGetAll } from '../../application/use-cases/document/document-get-all';
import { DocumentGetOneById } from '../../application/use-cases/document/document-get-one-by-id';
import { DocumentDelete } from '../../application/use-cases/document/document-delete';
import { DocumentHttpDto } from '../dtos/http/document-http-dto/document-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';

type DocumentGetAllResponse =
  | HttpPaginatedResponseDto<DocumentHttpDto>
  | DocumentHttpDto[];
@Controller('documents')
export class DocumentController {
  constructor(
    private readonly documentCreate: DocumentCreate,
    private readonly documentUpdate: DocumentUpdate,
    private readonly documentGetAll: DocumentGetAll,
    private readonly documentGetOneById: DocumentGetOneById,
    private readonly documentDelete: DocumentDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() documentCreateRequest: CreateDocumentDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentCreate.run(documentCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Document created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() documentUpdateRequest: UpdateDocumentDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentUpdate.run({ ...documentUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Document updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<DocumentGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const documentsPagination = await this.documentGetAll.run(
        paginationParams,
        filter,
      );
      if (documentsPagination instanceof Pagination) {
        const documentsHttpDto = documentsPagination
          .getEntityList()
          .map((document) => DocumentHttpDto.fromEntity(document));
        const paginatedDocumentsResponse =
          new HttpPaginatedResponseDto<DocumentHttpDto>(
            documentsHttpDto,
            documentsPagination.getTotalItems(),
            documentsPagination.getTotalPages(),
            documentsPagination.getPage(),
            documentsPagination.getPerPage(),
          );
        return new SuccessResponseDto<HttpPaginatedResponseDto<DocumentHttpDto>>(
          paginatedDocumentsResponse,
          HttpStatus.OK,
          'Documents retrieved successfully',
        );
      }
    }

    const documents = await this.documentGetAll.run(undefined, filter);

    const documentsHttpDto =
      documents instanceof Array
        ? documents.map((document) => DocumentHttpDto.fromEntity(document))
        : [];
    return new SuccessResponseDto<DocumentHttpDto[]>(
      documentsHttpDto,
      HttpStatus.OK,
      'Documents retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DocumentHttpDto>> {
    const document = await this.documentGetOneById.run(id);
    if (!document) {
      throw new NotFoundException('Document', id.toString());
    }
    const documentDtoHttp = DocumentHttpDto.fromEntity(document);
    return new SuccessResponseDto<DocumentHttpDto>(
      documentDtoHttp,
      HttpStatus.OK,
      'Document retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'Document deleted successfully',
    );
  }
}
