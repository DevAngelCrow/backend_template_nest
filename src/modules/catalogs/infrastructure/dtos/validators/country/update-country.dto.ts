import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  abbreviation!: string;
  @IsString()
  @IsNotEmpty()
  code!: string;
  @IsBoolean()
  @IsOptional()
  active!: boolean;
}
