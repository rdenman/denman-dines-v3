"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CreateRecipeInput } from "@/lib/validation";
import { GripVertical, Plus, X } from "lucide-react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";

interface InstructionSectionsProps {
  control: Control<CreateRecipeInput>;
}

export function InstructionSections({ control }: InstructionSectionsProps) {
  const {
    fields: sections,
    append: appendSection,
    remove: removeSection,
  } = useFieldArray({
    control,
    name: "instructionSections",
  });

  const addSection = () => {
    appendSection({
      name: "",
      instructions: [""],
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Instructions</CardTitle>
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
          <InstructionSection
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

interface InstructionSectionProps {
  control: Control<CreateRecipeInput>;
  sectionIndex: number;
  onRemove: () => void;
  showRemove: boolean;
}

function InstructionSection({
  control,
  sectionIndex,
  onRemove,
  showRemove,
}: InstructionSectionProps) {
  const { watch, setValue } = useFormContext<CreateRecipeInput>();
  const fieldName = `instructionSections.${sectionIndex}.instructions` as const;
  const instructions = watch(fieldName);

  const addInstruction = () => {
    setValue(fieldName, [...instructions, ""]);
  };

  const removeInstruction = (instructionIndex: number) => {
    setValue(
      fieldName,
      instructions.filter((_, i) => i !== instructionIndex)
    );
  };

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-2">
        <GripVertical className="size-4 text-muted-foreground" />
        <FormField
          control={control}
          name={`instructionSections.${sectionIndex}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Section name (e.g., Prepare the dough)"
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
        {instructions.map((_, instructionIndex) => (
          <div key={instructionIndex} className="flex gap-2 items-start">
            <div className="shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium mt-2">
              {instructionIndex + 1}
            </div>

            <div className="flex-1">
              <FormField
                control={control}
                name={`${fieldName}.${instructionIndex}`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Describe this step in detail..."
                        className="min-h-20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {instructions.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeInstruction(instructionIndex)}
                className="mt-2"
              >
                <X className="size-3" />
              </Button>
            )}
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addInstruction}
          className="w-full"
        >
          <Plus className="size-4" />
          Add Step
        </Button>
      </div>
    </div>
  );
}
