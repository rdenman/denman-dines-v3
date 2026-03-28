"use client";

import type { ComponentProps } from "react";
import { useFormStatus } from "react-dom";
import { LoadingOverlay } from "@/components/loading-overlay";
import { Button } from "@/components/ui/button";

export function FormLoadingButton(props: ComponentProps<typeof Button>) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button {...props} disabled={pending} />
      {pending && <LoadingOverlay />}
    </>
  );
}
