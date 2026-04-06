import { z } from "zod";

function transformOptional(v: string) {
  return v === "" ? undefined : v;
}

const recipeBaseFields = {
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().transform(transformOptional).optional(),
  servings: z.number().min(1).max(100).optional(),
  prepTime: z.number().min(0).max(1440).optional(),
  cookTime: z.number().min(0).max(1440).optional(),
  photo: z
    .union([z.url(), z.literal("")])
    .transform(transformOptional)
    .optional(),
  tips: z.array(
    z.object({
      text: z.string().min(1, "Tip cannot be empty"),
    }),
  ),
  instructionSections: z
    .array(
      z.object({
        name: z.string().min(1, "Section name is required"),
        instructions: z
          .array(
            z.object({
              text: z.string().min(1, "Instruction cannot be empty"),
            }),
          )
          .min(1, "At least one instruction is required"),
      }),
    )
    .min(1, "At least one instruction section is required"),
};

/**
 * Zod schema for validating recipe creation data sent to the API.
 * Ingredient sections contain structured ingredient arrays.
 */
export const createRecipeSchema = z.object({
  ...recipeBaseFields,
  ingredientSections: z
    .array(
      z.object({
        name: z.string().min(1, "Section name is required"),
        ingredients: z
          .array(
            z.object({
              name: z.string().min(1, "Ingredient name is required"),
              amount: z.string().optional(),
              preparation: z.string().optional(),
            }),
          )
          .min(1, "At least one ingredient is required"),
      }),
    )
    .min(1, "At least one ingredient section is required"),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;

/**
 * Zod schema for the recipe form UI. Ingredient sections use a freeform
 * textarea (one ingredient per line) instead of structured fields.
 * Text is parsed into structured data on submit.
 */
export const recipeFormSchema = z.object({
  ...recipeBaseFields,
  ingredientSections: z
    .array(
      z.object({
        name: z.string().min(1, "Section name is required"),
        ingredientText: z.string().min(1, "Enter at least one ingredient"),
      }),
    )
    .min(1, "At least one ingredient section is required"),
});

export type RecipeFormInput = z.infer<typeof recipeFormSchema>;

/**
 * Zod schema for validating image file uploads.
 *
 * This schema ensures that:
 * - The input is a valid File instance
 * - The file has content (size > 0)
 * - The file is an image type (MIME type starts with "image/")
 */
export const imageFileSchema = z
  .instanceof(File)
  .refine((file) => file.size > 0, "File cannot be empty")
  .refine((file) => file.type.startsWith("image/"), "Must be an image");
