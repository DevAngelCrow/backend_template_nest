import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsString()
  name!: string;
  @IsString()
  abbreviation!: string;
  @IsString()
  code!: string;
  @IsBoolean()
  @IsOptional()
  active!: boolean;
}
