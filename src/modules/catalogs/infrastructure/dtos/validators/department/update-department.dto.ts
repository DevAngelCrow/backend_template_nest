import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Department Name' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'Department Description' })
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 'Country Name' })
  id_country!: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
