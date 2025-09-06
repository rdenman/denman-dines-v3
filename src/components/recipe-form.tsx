"use client";

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
import { LoadingOverlay } from "./loading-overlay";
import { Button } from "./ui/button";

type RecipeFormProps =
  | {
      mode: "create";
      initialData?: undefined;
    }
  | {
      mode: "edit";
      initialData: CreateRecipeInput & { id: string; slug: string };
    };

export function RecipeForm({ mode, initialData }: RecipeFormProps) {
  const router = useRouter();
  const isEditMode = mode === "edit";

  const form = useForm<CreateRecipeInput>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: initialData || {
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

  async function onSubmit(
    data: CreateRecipeInput,
    event?: React.BaseSyntheticEvent
  ) {
    try {
      let photoUrl: string | undefined;

      const input = event?.target.photoFile as HTMLInputElement | undefined;
      const file = input?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const { url } = await uploadResponse.json();
        photoUrl = url;
      }

      const endpoint = isEditMode
        ? `/api/recipes/${initialData.id}`
        : "/api/recipes";
      const method = isEditMode ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        body: JSON.stringify({ ...data, photo: photoUrl }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isEditMode ? "update" : "create"} recipe`);
      }

      const recipe = await response.json();
      router.push(`/recipes/${encodeURIComponent(recipe.slug)}`);
    } catch (error) {
      console.error(
        `Error ${isEditMode ? "updating" : "creating"} recipe:`,
        error
      );
      // TODO: Add toast notification for error
    }
  }

  return (
    <>
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

              <FormField
                control={form.control}
                name="photo"
                render={() => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Input type="file" accept="image/*" name="photoFile" />
                    </FormControl>
                    {/* TODO add photo preview */}
                    {initialData?.photo && (
                      <p className="text-sm text-muted-foreground">
                        Current photo: {initialData.photo}
                      </p>
                    )}
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
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={form.formState.isSubmitting}
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
