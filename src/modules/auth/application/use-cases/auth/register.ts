import { PersonCreateService } from '@/modules/profile/application/services/person/person-create.service';
import { AddressCreateService } from '@/modules/profile/application/services/address/address-create.service';
import { DocumentCreateService } from '@/modules/profile/application/services/document/document-create.service';
import { StorageUploadService } from '@/modules/storage/application/services/storage/storage-upload.service';
import { RegisterDto } from '../../dtos/register.dto';
import { PersonDto } from '@/modules/profile/application/dtos/person.dto';

import { StorageFilesContentFile } from '@/modules/storage/domain/value-objects/storage-files-value-object/storage-files-content-file';
import { AddressDto } from '@/modules/profile/application/dtos/address.dto';
import { UserDto } from '../../../../identity-access-management/application/dtos/user.dto';
import { DocumentDto } from '@/modules/profile/application/dtos/document.dto';
import { SendVerificationEmail } from '../email/send-verification-email';
import { CreateUserService } from '@/modules/identity-access-management/application/services/create-user.service';
import { UserRolDto } from '@/modules/security/application/dtos/user-rol.dto';
import { CreateUserRoleService } from '@/modules/security/application/services/user-role/create-user-role.service';

interface FileUpload {
  originalname: string;
  size: number;
  mimetype: string;
}
export class Register<T extends FileUpload> {
  constructor(
    private readonly userCreateService: CreateUserService,
    private readonly personCreateService: PersonCreateService,
    private readonly addressCreateService: AddressCreateService,
    private readonly documentCreateService: DocumentCreateService,
    private readonly storageUploadService: StorageUploadService<T>,
    private readonly sendVerificationEmail: SendVerificationEmail,
    private readonly userRoleCreateService: CreateUserRoleService,
  ) {}

  async run(
    register_dto: RegisterDto<T>,
    provider_storage_code: string,
  ): Promise<void> {
    console.log(provider_storage_code, 'provider en use case');
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
      idPerson,
      register_dto.user_name,
      register_dto.password,
      register_dto.id_status_user,
      register_dto.last_access,
      register_dto.is_validated,
    );
    const userCreated = await this.userCreateService.run(userDto);
    const idUser = userCreated.getId()?.value();
    if (!idUser) {
      throw new Error('User id is undefined after creation');
    }
    await this.sendVerificationEmail.run(
      idUser,
      register_dto.email,
      register_dto.user_name,
    );
    // 6. Asignar rol
    const userRoleDto = new UserRolDto(idUser, [2]);

    await this.userRoleCreateService.run(userRoleDto);
  }
}
