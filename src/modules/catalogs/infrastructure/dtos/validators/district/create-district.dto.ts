import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  id_municipality!: number;
  @IsOptional()
  @IsBoolean()
  active!: boolean;
}
