import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RolRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Administrator' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Role with full permissions' })
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_status!: number;
}
