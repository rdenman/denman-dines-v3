-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "Account" DROP CONSTRAINT "Account_pkey";

ALTER TABLE "Account" RENAME COLUMN "provider" TO "providerId";
ALTER TABLE "Account" RENAME COLUMN "providerAccountId" TO "accountId";
ALTER TABLE "Account" RENAME COLUMN "refresh_token" TO "refreshToken";
ALTER TABLE "Account" RENAME COLUMN "access_token" TO "accessToken";
ALTER TABLE "Account" RENAME COLUMN "expires_at" TO "accessTokenExpiresAt";
ALTER TABLE "Account" RENAME COLUMN "id_token" TO "idToken";

ALTER TABLE "Account"
DROP COLUMN "session_state",
DROP COLUMN "token_type",
DROP COLUMN "type";

ALTER TABLE "Account"
ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("providerId", "accountId");

-- AlterTable
ALTER TABLE "Session" RENAME COLUMN "expires" TO "expiresAt";
ALTER TABLE "Session" RENAME COLUMN "sessionToken" TO "token";

ALTER TABLE "Session"
ADD COLUMN "ipAddress" TEXT,
ADD COLUMN "userAgent" TEXT;

-- AlterTable
ALTER TABLE "User" 
ALTER COLUMN "emailVerified" DROP DEFAULT,
ALTER COLUMN "emailVerified" TYPE BOOLEAN
USING ("emailVerified" IS NOT NULL);

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");
