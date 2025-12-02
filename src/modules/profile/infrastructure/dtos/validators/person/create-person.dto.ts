import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  first_name!: string;
  @IsDateString()
  @IsNotEmpty()
  birthdate!: Date;
  @IsNumber()
  @IsNotEmpty()
  id_gender!: number;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email!: string;
  @IsNumber()
  @IsNotEmpty()
  id_marital_status!: number;
  @IsString()
  @IsNotEmpty()
  phone!: string;
  @IsNumber()
  @IsNotEmpty()
  id_status!: number;
  @IsString()
  @IsOptional()
  middle_name!: string;
  @IsString()
  @IsNotEmpty()
  last_name!: string;
  @IsString()
  @IsNotEmpty()
  img_path!: string;
  @IsArray()
  @IsOptional()
  nationalities!: number[];
}
