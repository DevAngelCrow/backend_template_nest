import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGlobalStatusDto {
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
