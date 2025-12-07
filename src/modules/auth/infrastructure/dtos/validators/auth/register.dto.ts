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
  first_name!: string;

  @IsString()
  @IsNotEmpty()
  middle_name!: string;

  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate!: Date;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_gender!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_marital_status!: number;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  id_status?: number;

  @IsArray()
  @IsNotEmpty()
  nationalities!: number[];

  // User data
  @IsString()
  @IsNotEmpty()
  user_name!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  id_status_user?: number;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  last_access!: Date;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_validated?: boolean;

  // Address data
  @IsString()
  @IsNotEmpty()
  street!: string;

  @IsString()
  @IsNotEmpty()
  street_number!: string;

  @IsString()
  @IsNotEmpty()
  neighborhood!: string;

  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_district!: number;

  @IsString()
  @IsNotEmpty()
  house_number!: string;

  @IsString()
  @IsNotEmpty()
  block!: string;

  @IsString()
  @IsNotEmpty()
  pathway!: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  current?: boolean;

  // Document data
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty()
  id_type_document!: number;

  @IsString()
  @IsNotEmpty()
  document_number!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
