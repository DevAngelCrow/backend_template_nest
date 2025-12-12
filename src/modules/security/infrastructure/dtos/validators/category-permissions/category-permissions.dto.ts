import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CategoryPermissionsRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsBoolean()
  active!: boolean;
}
