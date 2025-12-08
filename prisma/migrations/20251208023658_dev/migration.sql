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
CREATE UNIQUE INDEX "mnt_email_verification_tokens_token_key" ON "mnt_email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "mnt_email_verification_tokens_id_user_idx" ON "mnt_email_verification_tokens"("id_user");

-- CreateIndex
CREATE INDEX "mnt_email_verification_tokens_token_idx" ON "mnt_email_verification_tokens"("token");
