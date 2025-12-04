import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProviderStorageDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  code!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsBoolean()
  @IsOptional()
  active!: boolean;
}