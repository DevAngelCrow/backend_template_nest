import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @IsNotEmpty()
  number_document!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  id_people!: number;
  @IsNumber()
  @IsNotEmpty()
  id_type_document!: number;
  @IsBoolean()
  @IsOptional()
  active!: boolean;
}