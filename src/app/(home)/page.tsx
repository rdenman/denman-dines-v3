import { Suspense } from "react";
import { PageContainer } from "@/components/page-container";
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
    <PageContainer>
      <Suspense fallback={<RecipeListSkeleton />}>
        <RecipeContent searchParams={searchParams} />
      </Suspense>
    </PageContainer>
  );
}
