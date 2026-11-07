"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { upload } from "@vercel/blob/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { clearAllRecipeListCaches } from "@/components/infinite-recipe-list";
import { LoadingOverlay } from "@/components/loading-overlay";
import { IngredientSections } from "@/components/recipe-form/ingredient-sections";
import { InstructionSections } from "@/components/recipe-form/instruction-sections";
import { PhotoField } from "@/components/recipe-form/photo-field";
import { TipsSection } from "@/components/recipe-form/tips-section";
import { Button } from "@/components/ui/button";
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
import { parseIngredientText } from "@/lib/parse-ingredient";
import { type RecipeFormInput, recipeFormSchema } from "@/lib/validation";

type RecipeFormProps =
  | {
      mode: "create";
      initialData?: undefined;
    }
  | {
      mode: "edit";
      initialData: RecipeFormInput & { id: string; slug: string };
    };

export function RecipeForm({ mode, initialData }: RecipeFormProps) {
  const router = useRouter();
  const isEditMode = mode === "edit";

  const form = useForm<RecipeFormInput>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialData || {
      title: "",
      description: "",
      photo: "",
      tips: [],
      ingredientSections: [{ name: "Ingredients", ingredientText: "" }],
      instructionSections: [
        { name: "Instructions", instructions: [{ text: "" }] },
      ],
    },
  });

  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [isPhotoProcessing, setIsPhotoProcessing] = useState(false);

  async function onSubmit(formData: RecipeFormInput) {
    try {
      let photoUrl: string | undefined;

      if (photoFile) {
        try {
          const blob = await upload(photoFile.name, photoFile, {
            access: "public",
            handleUploadUrl: "/api/upload",
            contentType: photoFile.type,
          });
          photoUrl = blob.url;
        } catch (error) {
          console.error("Error uploading photo:", error);
          form.setError("photo", {
            message:
              "Photo upload failed. Please try again or use a different image.",
          });
          return;
        }
      }

      const apiData = {
        ...formData,
        photo: photoUrl,
        ingredientSections: formData.ingredientSections.map((section) => ({
          name: section.name,
          ingredients: parseIngredientText(section.ingredientText),
        })),
      };

      const endpoint = isEditMode
        ? `/api/recipes/${initialData.id}`
        : "/api/recipes";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? "update" : "create"} recipe`);
      }

      const recipe = await response.json();
      clearAllRecipeListCaches();
      router.push(`/recipes/${encodeURIComponent(recipe.slug)}`);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} recipe:`,
        error,
      );
      // TODO: Add toast notification for error
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
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
                              value ? parseInt(value, 10) : undefined,
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
                              value ? parseInt(value, 10) : undefined,
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
                              value ? parseInt(value, 10) : undefined,
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

              <PhotoField
                existingPhoto={initialData?.photo || undefined}
                onPhotoChange={setPhotoFile}
                onProcessingChange={setIsPhotoProcessing}
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
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={form.formState.isSubmitting || isPhotoProcessing}
            >
              {isEditMode ? "Update Recipe" : "Create Recipe"}
            </Button>
          </div>
        </form>
      </Form>
      {form.formState.isSubmitting && <LoadingOverlay text="Submitting..." />}
    </>
  );
}
