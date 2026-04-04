"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { PageContainer } from "@/components/page-container";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RecipeError({ reset }: ErrorProps) {
  return (
    <PageContainer className="min-h-[60vh] flex items-center justify-center">
      <EmptyState
        icon={AlertTriangle}
        title="Something went wrong"
        description="We encountered an error loading this recipe. This might be a temporary issue."
      >
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </EmptyState>
    </PageContainer>
  );
}
