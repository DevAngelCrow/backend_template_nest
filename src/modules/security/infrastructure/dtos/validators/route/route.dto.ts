import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RouteRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
  @IsString()
  @IsNotEmpty()
  description!: string;
  @IsString()
  @IsNotEmpty()
  icon!: string;
  @IsString()
  @IsNotEmpty()
  uri!: string;
  @IsBoolean()
  active!: boolean;
  @IsBoolean()
  show!: boolean;
  @IsNumber()
  @IsNotEmpty()
  order!: number;
  @IsString()
  title!: string;
  @IsBoolean()
  required_auth!: boolean;
}
