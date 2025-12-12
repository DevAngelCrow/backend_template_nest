import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsNotEmpty()
  street!: string;
  @IsString()
  @IsNotEmpty()
  street_number!: string;
  @IsString()
  @IsNotEmpty()
  neighborhood!: string;
  @IsNumber()
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
  current!: boolean;
  @IsNumber()
  @IsNotEmpty()
  id_people!: number;
}
