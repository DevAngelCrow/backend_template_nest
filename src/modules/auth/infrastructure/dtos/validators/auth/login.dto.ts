import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  user_name!: string;
  @IsString()
  @IsNotEmpty()
  password!: string;
}
