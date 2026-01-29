import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  validateSync,
} from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables {
  @IsEnum(Environment)
  @IsNotEmpty()
  NODE_ENV!: Environment;

  @IsBoolean()
  SHOW_STACK_TRACE!: boolean;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  PORT!: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST!: string;

  @IsString()
  @IsNotEmpty()
  DB_USER!: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD!: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME!: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  DB_PORT!: number;

  @IsString()
  @IsNotEmpty()
  DATABASE_URL!: string;

  @IsString()
  @IsNotEmpty()
  DB_PROVIDER!: string;

  @IsString()
  @IsNotEmpty()
  PROVIDER_STORAGE_CODE!: string;

  @IsString()
  @IsNotEmpty()
  JWT_SECRET!: string;

  @IsString()
  @IsNotEmpty()
  JWT_EXPIRES_IN!: string;

  @IsString()
  EMAIL_HOST!: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  EMAIL_PORT!: number;

  @IsString()
  EMAIL_USER!: string;

  @IsString()
  EMAIL_PASSWORD!: string;

  @IsString()
  EMAIL_FROM!: string;

  @IsString()
  EMAIL_SECRET!: string;
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
