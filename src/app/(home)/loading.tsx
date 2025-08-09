import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-12 rounded-lg mb-4" />
        <Skeleton className="h-6 rounded-lg w-1/2 mx-auto" />
      </div>

      {/* Recipe Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="h-full">
            <CardHeader className="pb-3">
              {/* Image placeholder */}
              <Skeleton className="relative aspect-[4/3] w-full overflow-hidden rounded-lg" />
            </CardHeader>

            <CardContent className="flex-1 flex flex-col">
              {/* Title skeleton */}
              <Skeleton className="h-6 rounded mb-2" />

              {/* Description skeleton */}
              <div className="space-y-2 mb-4 flex-1">
                <Skeleton className="h-4 rounded" />
                <Skeleton className="h-4 rounded" />
                <Skeleton className="h-4 rounded w-3/4" />
              </div>

              {/* Metadata skeleton */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 rounded w-20" />
                </div>
                <Skeleton className="h-4 rounded w-16" />
              </div>

              {/* Author skeleton */}
              <Skeleton className="h-3 rounded w-24 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
          <Skeleton className="h-10 w-10 rounded" />
        </div>
      </div>
    </div>
  );
}
