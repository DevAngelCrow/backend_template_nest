import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class PermissionsRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsNumber()
  @IsNotEmpty()
  id_category_permissions!: number;
  @IsString()
  @IsNotEmpty()
  description!: Date;
  @IsBoolean()
  active!: boolean;
}
