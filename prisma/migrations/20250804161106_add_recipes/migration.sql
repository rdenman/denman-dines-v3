-- CreateTable
CREATE TABLE "public"."Recipe" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "photo" TEXT,
    "servings" INTEGER,
    "prepTime" INTEGER,
    "cookTime" INTEGER,
    "tips" TEXT[],
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."IngredientSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "IngredientSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ingredient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" TEXT,
    "preparation" TEXT,
    "order" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."InstructionSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "recipeId" TEXT NOT NULL,

    CONSTRAINT "InstructionSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Instruction" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "Instruction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_slug_key" ON "public"."Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_slug_idx" ON "public"."Recipe"("slug");

-- CreateIndex
CREATE INDEX "Recipe_userId_idx" ON "public"."Recipe"("userId");

-- CreateIndex
CREATE INDEX "IngredientSection_recipeId_order_idx" ON "public"."IngredientSection"("recipeId", "order");

-- CreateIndex
CREATE INDEX "Ingredient_sectionId_order_idx" ON "public"."Ingredient"("sectionId", "order");

-- CreateIndex
CREATE INDEX "InstructionSection_recipeId_order_idx" ON "public"."InstructionSection"("recipeId", "order");

-- CreateIndex
CREATE INDEX "Instruction_sectionId_order_idx" ON "public"."Instruction"("sectionId", "order");

-- AddForeignKey
ALTER TABLE "public"."Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."IngredientSection" ADD CONSTRAINT "IngredientSection_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Ingredient" ADD CONSTRAINT "Ingredient_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."IngredientSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InstructionSection" ADD CONSTRAINT "InstructionSection_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "public"."Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Instruction" ADD CONSTRAINT "Instruction_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "public"."InstructionSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
