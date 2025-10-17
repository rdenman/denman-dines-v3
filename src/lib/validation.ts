import { z } from "zod";

function transformOptional(v: string) {
  return v === "" ? undefined : v;
}

/**
 * Zod schema for validating recipe creation data.
 *
 * This schema validates all required fields for creating a new recipe including:
 * - Basic recipe information (title, servings, timing)
 * - Optional fields like description, photo URL, and tips
 * - Ingredient sections with grouped ingredients and preparation notes
 * - Instruction sections with step-by-step cooking directions
 */
export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title too long"),
  description: z.string().transform(transformOptional).optional(),
  servings: z.number().min(1).max(100).optional(),
  prepTime: z.number().min(0).max(1440).optional(), // max 24 hours in minutes
  cookTime: z.number().min(0).max(1440).optional(), // max 24 hours in minutes
  photo: z
    .union([z.url(), z.literal("")])
    .transform(transformOptional)
    .optional(),
  tips: z.array(z.string().min(1)),
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
            })
          )
          .min(1, "At least one ingredient is required"),
      })
    )
    .min(1, "At least one ingredient section is required"),
  instructionSections: z
    .array(
      z.object({
        name: z.string().min(1, "Section name is required"),
        instructions: z
          .array(z.string().min(1, "Instruction cannot be empty"))
          .min(1, "At least one instruction is required"),
      })
    )
    .min(1, "At least one instruction section is required"),
});

export type CreateRecipeInput = z.infer<typeof createRecipeSchema>;

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
