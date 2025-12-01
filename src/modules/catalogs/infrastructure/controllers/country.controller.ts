import { Body, Controller, Post } from '@nestjs/common';
import { CountryCreate } from '../../application/use-cases/country/country-create';
import { CreateCountryDto } from '../dtos/validators/create-country.dto';

@Controller('catalogs/countries')
export class CountryController {
  constructor(private readonly countryCreate: CountryCreate) {}
  @Post()
  async create(@Body() countryCreateRequest: CreateCountryDto): Promise<void> {
    return await this.countryCreate.run(countryCreateRequest);
  }
}
