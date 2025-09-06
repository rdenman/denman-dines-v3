import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-2">
        <Skeleton className="h-10 rounded-lg mb-4 w-48 mx-auto" />
        <Skeleton className="h-6 rounded-lg w-64 mx-auto mb-6" />
      </div>

      {/* Sort Button Skeleton */}
      <div className="flex justify-end items-center mb-6 w-full sm:w-auto">
        <Skeleton className="h-10 w-full sm:w-32 rounded" />
      </div>

      {/* Recipe Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <Card key={i} className="h-full">
            {/* Mobile layout: horizontal with image on left */}
            <div className="md:hidden flex">
              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-l-lg ml-4">
                <Skeleton className="w-full h-full" />
              </div>

              <div className="flex-1 px-4">
                {/* Title skeleton */}
                <Skeleton className="h-5 rounded mb-1" />

                {/* Description skeleton */}
                <div className="space-y-1 mb-1">
                  <Skeleton className="h-3 rounded" />
                  <Skeleton className="h-3 rounded w-3/4" />
                </div>

                {/* Metadata skeleton */}
                <div className="flex items-center justify-between text-sm">
                  <Skeleton className="h-3 rounded w-16" />
                  <Skeleton className="h-3 rounded w-12" />
                </div>
              </div>
            </div>

            {/* Desktop layout: vertical with image on top */}
            <div className="hidden md:block">
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
              </CardContent>
            </div>
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
