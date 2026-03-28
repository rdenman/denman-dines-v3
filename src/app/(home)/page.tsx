import { Suspense } from "react";
import type { QuerySearchParams } from "@/lib/query";
import { RecipeListSkeleton } from "./loading";
import { RecipeContent } from "./recipe-content";

export const revalidate = 120;

export default function Home({
  searchParams,
}: {
  searchParams: Promise<QuerySearchParams>;
}) {
  return (
    <div className="container mx-auto px-4 py-4">
      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
