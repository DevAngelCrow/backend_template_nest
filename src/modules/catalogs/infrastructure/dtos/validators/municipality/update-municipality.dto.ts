import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMunicipalityDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Springfield' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'A fictional city in the USA' })
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_department!: number;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
