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
import { DocumentTypeCreate } from '../../application/use-cases/document-type/document-type-create';
import { DocumentTypeDto } from '../dtos/validators/document-type/document-type.dto';
import { SuccessResponseDto } from '../../../../shared/infrastructure/http/dtos/http-success-response.dto';
import { DocumentTypeUpdate } from '../../application/use-cases/document-type/document-type-update';
import { HttpPaginatedResponseDto } from '../../../../shared/infrastructure/http/dtos/http-paginated-response.dto';
import { DocumentTypeGetAll } from '../../application/use-cases/document-type/document-type-get-all';
import { DocumentTypeGetOneById } from '../../application/use-cases/document-type/document-type-get-one-by-id';
import { DocumentTypeDelete } from '../../application/use-cases/document-type/document-type-delete';
import { DocumentTypeHttpDto } from '../dtos/http/document-type-http-dto/document-type-http.dto';
import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';
import { Pagination } from '@/shared/domain/value-object/pagination';
import { PaginationParamsDto } from '@/shared/application/dtos/pagination.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

type DocumentTypeGetAllResponse =
  | HttpPaginatedResponseDto<DocumentTypeHttpDto>
  | DocumentTypeHttpDto[];
@Controller('document-types')
@ApiBearerAuth('JWT-auth')
export class DocumentTypeController {
  constructor(
    private readonly documentTypeCreate: DocumentTypeCreate,
    private readonly documentTypeUpdate: DocumentTypeUpdate,
    private readonly documentTypeGetAll: DocumentTypeGetAll,
    private readonly documentTypeGetOneById: DocumentTypeGetOneById,
    private readonly documentTypeDelete: DocumentTypeDelete,
  ) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() documentTypeCreateRequest: DocumentTypeDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentTypeCreate.run(documentTypeCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'DocumentType created successfully',
    );
  }
  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() documentTypeUpdateRequest: DocumentTypeDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentTypeUpdate.run({ ...documentTypeUpdateRequest, id });
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'DocumentType updated successfully',
    );
  }
  @Get()
  @HttpCode(200)
  async getAll(
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('per_page', new ParseIntPipe({ optional: true })) per_page?: number,
    @Query('filter') filter?: string,
  ): Promise<SuccessResponseDto<DocumentTypeGetAllResponse>> {
    if (page && per_page) {
      const paginationParams = new PaginationParamsDto(page, per_page);
      const documentTypesPagination = await this.documentTypeGetAll.run(
        paginationParams,
        filter,
      );
      if (documentTypesPagination instanceof Pagination) {
        const documentTypesHttpDto = documentTypesPagination
          .getEntityList()
          .map((documentType) => DocumentTypeHttpDto.fromEntity(documentType));
        const paginatedDocumentTypesResponse =
          new HttpPaginatedResponseDto<DocumentTypeHttpDto>(
            documentTypesHttpDto,
            documentTypesPagination.getTotalItems(),
            documentTypesPagination.getTotalPages(),
            documentTypesPagination.getPage(),
            documentTypesPagination.getPerPage(),
          );
        return new SuccessResponseDto<
          HttpPaginatedResponseDto<DocumentTypeHttpDto>
        >(
          paginatedDocumentTypesResponse,
          HttpStatus.OK,
          'DocumentTypes retrieved successfully',
        );
      }
    }

    const documentTypes = await this.documentTypeGetAll.run(undefined, filter);

    const documentTypesHttpDto = Array.isArray(documentTypes)
      ? documentTypes.map((documentType) =>
          DocumentTypeHttpDto.fromEntity(documentType),
        )
      : [];
    return new SuccessResponseDto<DocumentTypeHttpDto[]>(
      documentTypesHttpDto,
      HttpStatus.OK,
      'DocumentTypes retrieved successfully',
    );
  }
  @Get(':id')
  @HttpCode(200)
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<DocumentTypeHttpDto>> {
    const documentType = await this.documentTypeGetOneById.run(id);
    if (!documentType) {
      throw new NotFoundException('DocumentType', id.toString());
    }
    const documentTypeDtoHttp = DocumentTypeHttpDto.fromEntity(documentType);
    return new SuccessResponseDto<DocumentTypeHttpDto>(
      documentTypeDtoHttp,
      HttpStatus.OK,
      'DocumentType retrieved successfully',
    );
  }
  @Delete(':id')
  @HttpCode(200)
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SuccessResponseDto<null>> {
    await this.documentTypeDelete.run(id);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.OK,
      'DocumentType deleted successfully',
    );
  }
}
