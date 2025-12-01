import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CountryCreate } from '../../application/use-cases/country/country-create';
import { CreateCountryDto } from '../dtos/validators/create-country.dto';
import { SuccessResponseDto } from '@/shared/infrastructure/http/dtos/http-success-response.dto';

@Controller('countries')
export class CountryController {
  constructor(private readonly countryCreate: CountryCreate) {}
  @Post()
  @HttpCode(201)
  async create(
    @Body() countryCreateRequest: CreateCountryDto,
  ): Promise<SuccessResponseDto<null>> {
    await this.countryCreate.run(countryCreateRequest);
    return new SuccessResponseDto<null>(
      null,
      HttpStatus.CREATED,
      'Country created successfully',
    );
  }
}
