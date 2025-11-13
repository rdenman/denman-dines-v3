/*
  Warnings:

  - The primary key for the `Account` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[providerId,accountId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- Step 1: Add id column as nullable
ALTER TABLE "Account" ADD COLUMN "id" TEXT;

-- Step 2: Populate id column with unique values for existing rows
-- Generate unique IDs using gen_random_uuid()
UPDATE "Account" 
SET "id" = 'acc_' || replace(gen_random_uuid()::text, '-', '')
WHERE "id" IS NULL;

-- Step 3: Make id column NOT NULL and set as primary key
ALTER TABLE "Account" 
  DROP CONSTRAINT "Account_pkey",
  ALTER COLUMN "id" SET NOT NULL,
  ADD CONSTRAINT "Account_pkey" PRIMARY KEY ("id");

-- Step 4: Add unique constraint on providerId and accountId
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");
