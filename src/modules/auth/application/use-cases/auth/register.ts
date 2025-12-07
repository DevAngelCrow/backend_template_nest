import { PersonCreateService } from '@/modules/profile/application/services/person/person-create.service';
import { UserCreate } from '../user/user-create';
import { AddressCreateService } from '@/modules/profile/application/services/address/address-create.service';
import { DocumentCreateService } from '@/modules/profile/application/services/document/document-create.service';
import { StorageUploadService } from '@/modules/storage/application/services/storage/storage-upload.service';
import { RegisterDto } from '../dtos/register.dto';
import { PersonDto } from '@/modules/profile/application/dtos/person.dto';

import { StorageFilesContentFile } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-content-file';
import { AddressDto } from '@/modules/profile/application/dtos/address.dto';
import { UserDto } from '../dtos/user.dto';
import { DocumentDto } from '@/modules/profile/application/dtos/document.dto';
import { Injectable } from '@nestjs/common';
import { Transactional } from '@/shared/infrastructure/decorators/transactional.decorator';

interface FileUpload {
  originalname: string;
  size: number;
  mimetype: string;
}
@Injectable()
export class Register<T extends FileUpload> {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly personCreateService: PersonCreateService,
    private readonly addressCreateService: AddressCreateService,
    private readonly documentCreateService: DocumentCreateService,
    private readonly storageUploadService: StorageUploadService<T>,
  ) {}
  @Transactional()
  async run(
    register_dto: RegisterDto<T>,
    provider_storage_code: string,
  ): Promise<void> {
    // 1. Cargar storage file
    const storageFileDto = new StorageFilesContentFile<T>(
      register_dto.file_img,
    );

    const storageFiles = await this.storageUploadService.run(
      storageFileDto.value(),
      provider_storage_code,
    );

    // 2. Crear persona
    const peopleDto = new PersonDto(
      register_dto.first_name,
      register_dto.birthdate,
      register_dto.id_gender,
      register_dto.email,
      register_dto.id_marital_status,
      register_dto.phone,
      register_dto.id_status,
      register_dto.middle_name,
      register_dto.last_name,
      storageFiles.getPath().value(),
      register_dto.nationalities,
    );

    const person = await this.personCreateService.run(peopleDto);

    const idPerson = person?.getId()?.value();
    if (!idPerson) {
      throw new Error('Person id is undefined after creation');
    }
    // 3. Crear dirección
    const addressDto = new AddressDto(
      register_dto.street,
      register_dto.street_number,
      register_dto.neighborhood,
      register_dto.id_district,
      register_dto.house_number,
      register_dto.block,
      register_dto.pathway,
      register_dto.current,
      idPerson,
    );

    await this.addressCreateService.run(addressDto);

    // 4. Crear documento
    const documentDto = new DocumentDto(
      register_dto.document_number,
      register_dto.description,
      idPerson,
      register_dto.id_type_document,
      register_dto.active,
    );

    await this.documentCreateService.run(documentDto);

    // 5. Crear usuario
    const userDto = new UserDto(
      /*idPerson*/ 99,
      register_dto.user_name,
      register_dto.password,
      register_dto.id_status_user,
      register_dto.last_access,
      register_dto.is_validated,
    );

    await this.userCreate.run(userDto);

    // 6. Asignar rol
    //const userRoleDto = new UserRoleDto(user.getId().value(), [2]);

    //await this.userRoleCreateService.userRoleCreateForUser(userRoleDto);
  }
}
