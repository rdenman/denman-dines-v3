"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RecipeError({ reset }: ErrorProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">🔥</div>
            <CardTitle className="text-3xl font-bold">Recipe Error</CardTitle>
            <CardDescription className="text-lg">
              Something went wrong loading this recipe.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              We encountered an error while trying to load this recipe. This
              might be a temporary issue.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={reset} variant="outline">
                🔄 Try Again
              </Button>
              <Button asChild>
                <Link href="/">🏠 Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
