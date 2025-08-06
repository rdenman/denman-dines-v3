import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="h-12 bg-muted rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded-lg w-1/2 mx-auto animate-pulse"></div>
      </div>

      {/* Recipe Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader className="pb-3">
              {/* Image placeholder */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-muted animate-pulse"></div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Title skeleton */}
              <div className="h-6 bg-muted rounded mb-2 animate-pulse"></div>

              {/* Description skeleton */}
              <div className="space-y-2 mb-4 flex-1">
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
              </div>

              {/* Metadata skeleton */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-muted rounded w-20 animate-pulse"></div>
                </div>
                <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
              </div>

              {/* Author skeleton */}
              <div className="h-3 bg-muted rounded w-24 mt-2 animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
          <div className="h-10 w-10 bg-muted rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
