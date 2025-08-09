import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Recipe Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-10 rounded-lg mb-4" />
        <Skeleton className="h-6 rounded-lg mb-6 w-3/4" />

        {/* Recipe Photo Skeleton */}
        <Skeleton className="w-full h-96 rounded-lg mb-6" />

        {/* Recipe Meta Information Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-4">
              <Skeleton className="h-8 rounded mb-2" />
              <Skeleton className="h-4 rounded w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients Skeleton */}
        <div>
          <Skeleton className="h-8 rounded-lg mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-2">
                    <Skeleton className="h-4 rounded w-16" />
                    <Skeleton className="h-4 rounded flex-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions Skeleton */}
        <div>
          <Skeleton className="h-8 rounded-lg mb-6" />
          <Card>
            <CardHeader>
              <Skeleton className="h-6 rounded" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-4 rounded flex-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 rounded-lg mb-6" />
        <Card>
          <CardContent className="py-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-2 h-2 rounded-full mt-2" />
                  <Skeleton className="h-4 rounded flex-1" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
