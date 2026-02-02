import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProviderStorageDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'AWS S3' })
  name!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'aws_s3' })
  code!: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Amazon Web Services S3 storage provider' })
  description!: string;
  @IsBoolean()
  @IsOptional()
  @ApiProperty({ example: true })
  active!: boolean;
}
