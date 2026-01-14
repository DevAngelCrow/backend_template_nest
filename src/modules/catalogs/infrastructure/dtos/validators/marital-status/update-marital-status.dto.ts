import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMaritalStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Married' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'Indicates if the person is married' })
  description!: string;
}
