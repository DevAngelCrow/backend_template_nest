import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsDate,
} from 'class-validator';

export class RegisterValidatorDto {
  // Person data
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'first name' })
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'middle name' })
  middle_name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'last name' })
  last_name!: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '1990-01-01' })
  birthdate!: Date;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_gender!: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'example@example.com' })
  email!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_marital_status!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2222-2222' })
  phone!: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  id_status?: number;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty({ example: [1, 2] })
  nationalities!: number[];

  // User data
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'user name' })
  user_name!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password' })
  password!: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ example: 1 })
  id_status_user?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @ApiProperty({ example: '2024-01-01T00:00:00Z' })
  last_access!: Date;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  is_validated?: boolean;

  // Address data
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Main St' })
  street!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  street_number!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Downtown' })
  neighborhood!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_district!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '456' })
  house_number!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Apt 7B' })
  block!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Near the park' })
  pathway!: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  current?: boolean;

  // Document data
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_type_document!: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'A12345678' })
  document_number!: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Description about the document', required: false })
  description?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  active?: boolean;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  file_img?: BinaryType;
}
