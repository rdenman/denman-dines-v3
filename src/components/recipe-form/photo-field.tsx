"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { prepareImageForUpload } from "@/lib/prepare-image";
import type { RecipeFormInput } from "@/lib/validation";

interface PhotoFieldProps {
  existingPhoto?: string;
  onPhotoChange: (file: File | null) => void;
  onProcessingChange: (isProcessing: boolean) => void;
}

export function PhotoField({
  existingPhoto,
  onPhotoChange,
  onProcessingChange,
}: PhotoFieldProps) {
  const form = useFormContext<RecipeFormInput>();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function setProcessing(value: boolean): void {
    setIsProcessing(value);
    onProcessingChange(value);
  }

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    form.clearErrors("photo");
    setPreviewUrl(null);
    onPhotoChange(null);
    if (!file) return;

    setProcessing(true);
    try {
      const image = await prepareImageForUpload(file);
      setPreviewUrl(URL.createObjectURL(image));
      onPhotoChange(image);
    } catch (error) {
      console.error("Error preparing photo:", error);
      input.value = "";
      form.setError("photo", {
        message:
          error instanceof Error ? error.message : "Could not read this image.",
      });
    } finally {
      setProcessing(false);
    }
  }

  const displayUrl = previewUrl ?? existingPhoto;

  return (
    <FormField
      control={form.control}
      name="photo"
      render={() => (
        <FormItem>
          <FormLabel>Photo</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/*,.heic,.heif"
              name="photoFile"
              onChange={handleChange}
              disabled={isProcessing}
              data-testid="photo-input"
            />
          </FormControl>
          <FormMessage />
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {isProcessing
              ? "Preparing photo…"
              : previewUrl
                ? "New photo (saved when you submit)"
                : existingPhoto
                  ? "Current photo"
                  : null}
          </p>
          {displayUrl && !isProcessing && (
            <div className="relative aspect-video w-full max-w-md overflow-hidden rounded-lg border">
              <Image
                src={displayUrl}
                alt={
                  previewUrl
                    ? "Preview of selected photo"
                    : "Current recipe photo"
                }
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 448px"
                unoptimized={Boolean(previewUrl)}
                data-testid="photo-preview"
              />
            </div>
          )}
        </FormItem>
      )}
    />
  );
}
