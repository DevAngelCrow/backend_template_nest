import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMaritalStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Single' })
  name!: string;
  @IsString()
  @ApiProperty({ example: 'Indicates if the person is single' })
  description!: string;
}
