import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PermissionsRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Create User' })
  name!: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  id_category_permissions!: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Allows creating a new user' })
  description!: string;
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
