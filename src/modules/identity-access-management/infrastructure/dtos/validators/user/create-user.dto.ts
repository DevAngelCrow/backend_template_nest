import {
  IsBoolean,
  //IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  id_people!: number;
  @IsString()
  @IsNotEmpty()
  user_name!: string;
  @IsString()
  @IsNotEmpty()
  password!: string;
  @IsNumber()
  @IsNotEmpty()
  id_status!: number;
  @IsDateString()
  @IsNotEmpty()
  last_access!: Date;
  @IsBoolean()
  @IsNotEmpty()
  is_validated!: boolean;
  @IsNumber()
  @IsOptional()
  id?: number;
}
