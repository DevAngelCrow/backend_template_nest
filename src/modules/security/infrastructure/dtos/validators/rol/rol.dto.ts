import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RolRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsNumber()
  @IsNotEmpty()
  id_status!: number;
}
