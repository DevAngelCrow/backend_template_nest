import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RouteRequestDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Dashboard' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Main dashboard route' })
  description!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'dashboard-icon' })
  icon!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '/dashboard' })
  uri!: string;
  @IsBoolean()
  @ApiProperty({ example: true })
  active!: boolean;
  @IsBoolean()
  @ApiProperty({ example: true })
  show!: boolean;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  order!: number;
  @IsString()
  @ApiProperty({ example: 'Dashboard Title' })
  title!: string;
  @IsBoolean()
  @ApiProperty({ example: true })
  required_auth!: boolean;
}
