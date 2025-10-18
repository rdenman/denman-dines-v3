-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN "totalTime" INTEGER GENERATED ALWAYS AS (COALESCE("prepTime", 0) + COALESCE("cookTime", 0)) STORED;
