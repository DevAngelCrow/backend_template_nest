import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Country Name' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'ES' })
  abbreviation!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  code!: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  active!: boolean;
}
