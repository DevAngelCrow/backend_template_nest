import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  MaxLength,
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

  @IsInt()
  @IsNotEmpty()
  id_gender!: number;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsInt()
  @IsNotEmpty()
  id_marital_status!: number;

  @IsString()
  @IsNotEmpty()
  phone!: string;

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

  @IsInt()
  @IsOptional()
  id_status_user?: number;

  @IsDateString()
  @IsNotEmpty()
  last_access!: Date;

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

  @IsBoolean()
  @IsOptional()
  current?: boolean;

  // Document data
  @IsInt()
  @IsNotEmpty()
  id_type_document!: number;

  @IsString()
  @IsNotEmpty()
  document_number!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}