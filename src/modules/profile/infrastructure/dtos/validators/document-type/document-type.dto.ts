import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Passport' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Official travel document issued by a government' })
  description!: string;
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'AAA-9999999', required: false })
  mask?: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true, required: false })
  active!: boolean;
}
