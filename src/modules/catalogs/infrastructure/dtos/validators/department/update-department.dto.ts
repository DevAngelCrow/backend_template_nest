import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDepartmentDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  id_country!: number;
  @IsOptional()
  @IsBoolean()
  active!: boolean;
}
