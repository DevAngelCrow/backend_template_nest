import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CategoryPermissionsRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Admin' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Category for admin permissions' })
  description!: string;
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
}
