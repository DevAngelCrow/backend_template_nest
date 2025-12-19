import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePersonDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'John' })
  first_name!: string;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '1990-01-01' })
  birthdate!: Date;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_gender!: number;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'john.doe@example.com' })
  email!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 2 })
  id_marital_status!: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2222-2222' })
  phone!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_status!: number;
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Michael', required: false })
  middle_name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Doe' })
  last_name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'http://example.com/image.jpg' })
  img_path!: string;
  @IsArray()
  @IsOptional()
  @ApiProperty({ example: [1, 2], required: false })
  nationalities!: number[];
}
