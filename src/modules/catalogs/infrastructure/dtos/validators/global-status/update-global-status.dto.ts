import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGlobalStatusDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
  @IsString()
  @IsNotEmpty()
  table_header!: string;
  @IsOptional()
  @IsBoolean()
  active!: boolean;
}
