-- CreateTable
CREATE TABLE "ctl_category_permissions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ctl_category_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_country" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "abbreviation" VARCHAR(150) NOT NULL,
    "code" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_department" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "id_country" BIGINT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_district" (
    "id" BIGSERIAL NOT NULL,
    "id_municipality" BIGINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_district_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_document_type" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "mask" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_document_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_gender" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_gender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_marital_status" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_marital_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_municipality" (
    "id" BIGSERIAL NOT NULL,
    "id_department" BIGINT NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "ctl_municipality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_permissions" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "id_category_permissions" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "ctl_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_provider_storage" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "code" VARCHAR(6) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "ctl_provider_storage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ctl_status" (
    "id" BIGSERIAL NOT NULL,
    "table_header" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "state" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "ctl_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_address" (
    "id" BIGSERIAL NOT NULL,
    "id_people" BIGINT NOT NULL,
    "street" VARCHAR(150) NOT NULL,
    "street_number" VARCHAR(150) NOT NULL,
    "neighborhood" VARCHAR(150) NOT NULL,
    "id_district" BIGINT NOT NULL,
    "house_number" VARCHAR(150) NOT NULL,
    "block" VARCHAR(150) NOT NULL,
    "pathway" VARCHAR(150) NOT NULL,
    "current" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "mnt_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_document" (
    "id" BIGSERIAL NOT NULL,
    "document_number" VARCHAR(255) NOT NULL,
    "id_document_type" BIGINT NOT NULL,
    "id_people" BIGINT NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_people" (
    "id" BIGSERIAL NOT NULL,
    "first_name" VARCHAR(150) NOT NULL,
    "middle_name" VARCHAR(150) NOT NULL,
    "last_name" VARCHAR(150) NOT NULL,
    "birthdate" DATE NOT NULL,
    "id_gender" BIGINT NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "id_marital_status" BIGINT NOT NULL,
    "img_path" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(14) NOT NULL,
    "id_status" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_role" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(150) NOT NULL,
    "id_status" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "mnt_role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_route" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255),
    "icon" VARCHAR(150) NOT NULL,
    "uri" VARCHAR(150) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "show" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER,
    "required_auth" BOOLEAN NOT NULL DEFAULT true,
    "title" VARCHAR(150) NOT NULL,
    "id_parent" BIGINT,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_route_permissions" (
    "id" BIGSERIAL NOT NULL,
    "id_permission" BIGINT NOT NULL,
    "id_route" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_route_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_storage_files" (
    "id" BIGSERIAL NOT NULL,
    "filename" VARCHAR(150) NOT NULL,
    "path" VARCHAR(500) NOT NULL,
    "id_provider" BIGINT NOT NULL,
    "size" BIGINT NOT NULL,
    "mime_type" VARCHAR(150) NOT NULL,
    "id_user" BIGINT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "deleted_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),

    CONSTRAINT "mnt_storage_files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_user" (
    "id" BIGSERIAL NOT NULL,
    "id_people" BIGINT NOT NULL,
    "user_name" VARCHAR(150) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "id_status" BIGINT NOT NULL,
    "last_access" DATE NOT NULL,
    "is_validated" BOOLEAN NOT NULL,
    "email_verified_at" TIMESTAMP(0),
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_user_rol" (
    "id" BIGSERIAL NOT NULL,
    "id_role" BIGINT NOT NULL,
    "id_user" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "mnt_user_rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people_country" (
    "id" BIGSERIAL NOT NULL,
    "id_people" BIGINT NOT NULL,
    "id_country" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "people_country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_permissions" (
    "id" BIGSERIAL NOT NULL,
    "id_role" BIGINT NOT NULL,
    "id_permission" BIGINT NOT NULL,
    "created_at" TIMESTAMP(0),
    "updated_at" TIMESTAMP(0),
    "deleted_at" TIMESTAMP(0),

    CONSTRAINT "rol_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mnt_email_verification_tokens" (
    "id" BIGSERIAL NOT NULL,
    "id_user" BIGINT NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMP(0) NOT NULL,
    "created_at" TIMESTAMP(0) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mnt_email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mnt_people_email_unique" ON "mnt_people"("email");

-- CreateIndex
CREATE UNIQUE INDEX "mnt_user_id_people_unique" ON "mnt_user"("id_people");

-- CreateIndex
CREATE UNIQUE INDEX "mnt_email_verification_tokens_token_key" ON "mnt_email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "mnt_email_verification_tokens_id_user_idx" ON "mnt_email_verification_tokens"("id_user");

-- CreateIndex
CREATE INDEX "mnt_email_verification_tokens_token_idx" ON "mnt_email_verification_tokens"("token");

-- AddForeignKey
ALTER TABLE "ctl_department" ADD CONSTRAINT "ctl_department_id_country_foreign" FOREIGN KEY ("id_country") REFERENCES "ctl_country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ctl_district" ADD CONSTRAINT "ctl_district_id_municipality_foreign" FOREIGN KEY ("id_municipality") REFERENCES "ctl_municipality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ctl_municipality" ADD CONSTRAINT "ctl_municipality_id_department_foreign" FOREIGN KEY ("id_department") REFERENCES "ctl_department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ctl_permissions" ADD CONSTRAINT "ctl_permissions_id_category_permissions_foreign" FOREIGN KEY ("id_category_permissions") REFERENCES "ctl_category_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_address" ADD CONSTRAINT "mnt_address_id_district_foreign" FOREIGN KEY ("id_district") REFERENCES "ctl_district"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_address" ADD CONSTRAINT "mnt_address_id_people_foreign" FOREIGN KEY ("id_people") REFERENCES "mnt_people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_document" ADD CONSTRAINT "mnt_document_id_document_type_foreign" FOREIGN KEY ("id_document_type") REFERENCES "ctl_document_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_document" ADD CONSTRAINT "mnt_document_id_people_foreign" FOREIGN KEY ("id_people") REFERENCES "mnt_people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_people" ADD CONSTRAINT "mnt_people_id_gender_foreign" FOREIGN KEY ("id_gender") REFERENCES "ctl_gender"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_people" ADD CONSTRAINT "mnt_people_id_marital_status_foreign" FOREIGN KEY ("id_marital_status") REFERENCES "ctl_marital_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_people" ADD CONSTRAINT "mnt_people_id_status_foreign" FOREIGN KEY ("id_status") REFERENCES "ctl_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_role" ADD CONSTRAINT "mnt_role_id_status_foreign" FOREIGN KEY ("id_status") REFERENCES "ctl_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_route" ADD CONSTRAINT "mnt_route_id_parent_foreign" FOREIGN KEY ("id_parent") REFERENCES "mnt_route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_route_permissions" ADD CONSTRAINT "mnt_route_permissions_id_permission_foreign" FOREIGN KEY ("id_permission") REFERENCES "ctl_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_route_permissions" ADD CONSTRAINT "mnt_route_permissions_id_route_foreign" FOREIGN KEY ("id_route") REFERENCES "mnt_route"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_storage_files" ADD CONSTRAINT "mnt_storage_files_id_provider_foreign" FOREIGN KEY ("id_provider") REFERENCES "ctl_provider_storage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_storage_files" ADD CONSTRAINT "mnt_storage_files_id_user_foreign" FOREIGN KEY ("id_user") REFERENCES "mnt_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_user" ADD CONSTRAINT "mnt_user_id_people_foreign" FOREIGN KEY ("id_people") REFERENCES "mnt_people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_user" ADD CONSTRAINT "mnt_user_id_status_foreign" FOREIGN KEY ("id_status") REFERENCES "ctl_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_user_rol" ADD CONSTRAINT "mnt_user_rol_id_role_foreign" FOREIGN KEY ("id_role") REFERENCES "mnt_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mnt_user_rol" ADD CONSTRAINT "mnt_user_rol_id_user_foreign" FOREIGN KEY ("id_user") REFERENCES "mnt_user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "people_country" ADD CONSTRAINT "people_country_id_country_foreign" FOREIGN KEY ("id_country") REFERENCES "ctl_country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "people_country" ADD CONSTRAINT "people_country_id_people_foreign" FOREIGN KEY ("id_people") REFERENCES "mnt_people"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rol_permissions" ADD CONSTRAINT "rol_permissions_id_permission_foreign" FOREIGN KEY ("id_permission") REFERENCES "ctl_permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "rol_permissions" ADD CONSTRAINT "rol_permissions_id_role_foreign" FOREIGN KEY ("id_role") REFERENCES "mnt_role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
