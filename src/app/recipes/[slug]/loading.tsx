import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="w-full h-96 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardContent className="space-y-3 py-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-8 w-32" />
          <Card>
            <CardContent className="space-y-3 py-6">
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
