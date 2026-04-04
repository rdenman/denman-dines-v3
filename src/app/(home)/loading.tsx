import { PageContainer } from "@/components/page-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PLACEHOLDERS = Array.from({ length: 8 });

export function RecipeListSkeleton() {
  return (
    <>
      <div className="mb-4 flex items-center justify-end">
        <Skeleton className="h-9 w-48" />
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {PLACEHOLDERS.map((_, index) => (
          <Card key={index} className="h-full overflow-hidden p-0">
            {/* Mobile skeleton: horizontal */}
            <div className="flex md:hidden">
              <Skeleton className="size-28 shrink-0" />
              <div className="flex flex-1 flex-col justify-between p-3">
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-3 w-12" />
                </div>
              </div>
            </div>
            {/* Desktop skeleton: vertical */}
            <div className="hidden md:block">
              <CardHeader className="p-0">
                <Skeleton className="aspect-4/3 w-full" />
              </CardHeader>
              <CardContent className="space-y-2 px-4 pb-3 pt-3">
                <CardTitle>
                  <Skeleton className="h-5 w-3/4" />
                </CardTitle>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex justify-between pt-1">
                  <Skeleton className="h-3.5 w-16" />
                  <Skeleton className="h-3.5 w-16" />
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default function HomeLoading() {
  return (
    <PageContainer>
      <RecipeListSkeleton />
    </PageContainer>
  );
}
