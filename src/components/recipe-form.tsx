"use client";

import { FormLoadingButton } from "@/components/form-loading-button";
import { IngredientSections } from "@/components/ingredient-sections";
import { InstructionSections } from "@/components/instruction-sections";
import { TipsSection } from "@/components/tips-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createRecipeSchema, type CreateRecipeInput } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function RecipeForm() {
  const router = useRouter();

  const form = useForm<CreateRecipeInput>({
    resolver: zodResolver(createRecipeSchema),
    // TODO make this a constant somewhere
    defaultValues: {
      title: "",
      description: "",
      photo: "",
      tips: [],
      ingredientSections: [
        {
          name: "Ingredients",
          ingredients: [{ name: "", amount: "", preparation: "" }],
        },
      ],
      instructionSections: [{ name: "Instructions", instructions: [""] }],
    },
  });

  async function onSubmit(data: CreateRecipeInput) {
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create recipe");
      }

      const recipe = await response.json();
      router.push(`/recipes/${recipe.slug}`);
    } catch (error) {
      console.error("Error creating recipe:", error);
      // TODO: Add toast notification for error
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Recipe Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipe Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter recipe title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of your recipe"
                      className="min-h-20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TODO make some common component for these numeric fields */}
              <FormField
                control={form.control}
                name="servings"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Servings</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="4"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value ? parseInt(value, 10) : undefined
                          );
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prepTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prep Time (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="15"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value ? parseInt(value, 10) : undefined
                          );
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cookTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cook Time (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="30"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value ? parseInt(value, 10) : undefined
                          );
                        }}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* TODO create a file picker */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Photo URL</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Ingredients */}
        <IngredientSections control={form.control} />

        {/* Instructions */}
        <InstructionSections control={form.control} />

        {/* Tips */}
        <TipsSection control={form.control} />

        {/* Submit Button */}
        <div className="flex justify-end">
          <FormLoadingButton type="submit" size="lg">
            Create Recipe
          </FormLoadingButton>
        </div>
      </form>
    </Form>
  );
}
