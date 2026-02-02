import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 123 })
  id_people!: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'johndoe' })
  user_name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'securePassword123' })
  password!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_status!: number;
  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ example: '2024-04-27T12:00:00Z' })
  last_access!: Date;
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true })
  is_validated!: boolean;
  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 10, required: false })
  id?: number;
}
