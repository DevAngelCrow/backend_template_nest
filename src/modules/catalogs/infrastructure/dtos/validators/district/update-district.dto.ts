import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateDistrictDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'District Name' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'Description of the district' })
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_municipality!: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
