import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMaritalStatusDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  description!: string;
}
