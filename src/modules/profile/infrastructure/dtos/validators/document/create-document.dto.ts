import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'AB1234567' })
  number_document!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Passport issued by country X' })
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  id_people!: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  id_type_document!: number;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  active!: boolean;
}
