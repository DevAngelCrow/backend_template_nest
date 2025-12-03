import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDocumentTypeDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsOptional()
  mask?: string;
  @IsBoolean()
  @IsOptional()
  active!: boolean;
}