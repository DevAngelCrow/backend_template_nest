import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class MenuRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsDateString()
  @IsNotEmpty()
  description!: Date;
  @IsBoolean()
  active!: boolean;
}
