import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateMunicipalityDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  id_department!: number;
  @IsOptional()
  @IsBoolean()
  active!: boolean;
}
