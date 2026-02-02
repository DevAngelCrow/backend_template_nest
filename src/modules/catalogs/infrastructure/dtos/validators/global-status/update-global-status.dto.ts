import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGlobalStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Active' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'Indicates if the status is active or not' })
  description!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Status' })
  table_header!: string;
  @IsOptional()
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
