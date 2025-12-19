import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 'Main St' })
  street!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  street_number!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Downtown' })
  neighborhood!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 45 })
  id_district!: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'A1' })
  house_number!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'B' })
  block!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Pathway 9' })
  pathway!: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  current!: boolean;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 10 })
  id_people!: number;
}
