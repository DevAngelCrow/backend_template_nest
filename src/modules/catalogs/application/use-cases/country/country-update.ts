// import { CountryRepository } from 'src/modules/catalogs/domain/repositories/country-repository';
// import { CountryDto } from '../../dtos/country.dto';
// import { Country } from 'src/modules/catalogs/domain/entities/country';
// import { NotFoundException } from '@/shared/domain/exceptions/not-found.exception';

// export class CountryUpdate {
//   constructor(protected readonly countryRepository: CountryRepository) {}
//   public async run(country_dto: CountryDto): Promise<void> {
//     const country = Country.create({ ...country_dto });
//     const countryId = country.getId();
//     if (!countryId) {
//       throw new Error(`Country id is undefined`);
//     }
//     const foundCountry = await this.countryRepository.getOneById(countryId);
//     if (!foundCountry) {
//       throw new NotFoundException('Country', countryId.value().toString());
//     }
//     await this.countryRepository.update(country);
//   }
// }
