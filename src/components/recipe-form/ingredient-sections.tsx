"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type CreateRecipeInput } from "@/lib/validation";
import { GripVertical, Plus, X } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

interface IngredientSectionsProps {
  control: Control<CreateRecipeInput>;
}

export function IngredientSections({ control }: IngredientSectionsProps) {
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "ingredientSections",
  });

  const addSection = () => {
    appendSection({
      name: "",
      ingredients: [{ name: "", amount: "", preparation: "" }],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Ingredients</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addSection}
          >
            <Plus className="size-4" />
            Add Section
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <IngredientSection
            key={section.id}
            control={control}
            sectionIndex={sectionIndex}
            onRemove={() => removeSection(sectionIndex)}
            showRemove={sections.length > 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface IngredientSectionProps {
  control: Control<CreateRecipeInput>;
  sectionIndex: number;
  onRemove: () => void;
  showRemove: boolean;
}

function IngredientSection({
  control,
  sectionIndex,
  onRemove,
  showRemove,
}: IngredientSectionProps) {
  const {
    fields: ingredients,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: `ingredientSections.${sectionIndex}.ingredients`,
  });

  const addIngredient = () => {
    appendIngredient({ name: "", amount: "", preparation: "" });
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <GripVertical className="size-4 text-muted-foreground" />
        <FormField
          control={control}
          name={`ingredientSections.${sectionIndex}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Section name (e.g., For the dough)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showRemove && (
          <Button type="button" variant="outline" size="sm" onClick={onRemove}>
            <X className="size-4" />
          </Button>
        )}
      </div>

      <div className="space-y-3">
        {ingredients.map((ingredient, ingredientIndex) => (
          <div
            key={ingredient.id}
            className="grid grid-cols-12 gap-2 items-end"
          >
            <div className="col-span-5">
              <FormField
                control={control}
                name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.name`}
                render={({ field }) => (
                  <FormItem>
                    {ingredientIndex === 0 && (
                      <FormLabel className="text-sm">Ingredient</FormLabel>
                    )}
                    <FormControl>
                      <Input placeholder="flour" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-3">
              <FormField
                control={control}
                name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.amount`}
                render={({ field }) => (
                  <FormItem>
                    {ingredientIndex === 0 && (
                      <FormLabel className="text-sm">Amount</FormLabel>
                    )}
                    <FormControl>
                      <Input placeholder="2 cups" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-3">
              <FormField
                control={control}
                name={`ingredientSections.${sectionIndex}.ingredients.${ingredientIndex}.preparation`}
                render={({ field }) => (
                  <FormItem>
                    {ingredientIndex === 0 && (
                      <FormLabel className="text-sm">Preparation</FormLabel>
                    )}
                    <FormControl>
                      <Input placeholder="diced" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-1 flex justify-center">
              {ingredients.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeIngredient(ingredientIndex)}
                >
                  <X className="size-3" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addIngredient}
          className="w-full"
        >
          <Plus className="size-4" />
          Add Ingredient
        </Button>
      </div>
    </div>
  );
}
