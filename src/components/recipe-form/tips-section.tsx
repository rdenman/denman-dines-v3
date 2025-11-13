"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { type CreateRecipeInput } from "@/lib/validation";
import { Lightbulb, Plus, X } from "lucide-react";
import { Control, useFormContext } from "react-hook-form";

interface TipsSectionProps {
  control: Control<CreateRecipeInput>;
}

export function TipsSection({ control }: TipsSectionProps) {
  const { watch, setValue } = useFormContext<CreateRecipeInput>();
  const fieldName = "tips" as const;
  const tips = watch(fieldName);

  const addTip = () => {
    setValue(fieldName, [...tips, ""]);
  };

  const removeTip = (tipIndex: number) => {
    setValue(
      fieldName,
      tips.filter((_, i) => i !== tipIndex)
    );
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="size-5 text-yellow-500" />
            <CardTitle>Tips & Notes</CardTitle>
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addTip}>
            <Plus className="size-4" />
            Add Tip
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tips.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Lightbulb className="size-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No tips added yet</p>
            <p className="text-xs">
              Share helpful tips and tricks for this recipe
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tips.map((_, tipIndex) => (
              <div key={tipIndex} className="flex gap-3 items-start">
                <div className="shrink-0 w-6 h-6 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-xs font-medium mt-2">
                  <Lightbulb className="size-3" />
                </div>

                <div className="flex-1">
                  <FormField
                    control={control}
                    name={`${fieldName}.${tipIndex}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Share a helpful tip or note about this recipe..."
                            className="min-h-16"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeTip(tipIndex)}
                  className="mt-2"
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
