import { z } from "zod";

function transformOptional(v: string) {
  return v === "" ? undefined : v;
}

/**
 * Shared Zod schema for recipe creation/validation
 * Used by both frontend forms and backend API
 * This file contains only schemas and types, no server-side dependencies
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
