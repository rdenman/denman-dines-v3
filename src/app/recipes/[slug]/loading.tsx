import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function RecipeLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Recipe Header Skeleton */}
      <div className="mb-8">
        <div className="h-10 bg-muted rounded-lg mb-4 animate-pulse"></div>
        <div className="h-6 bg-muted rounded-lg mb-6 w-3/4 animate-pulse"></div>
        
        {/* Recipe Photo Skeleton */}
        <div className="w-full h-96 bg-muted rounded-lg mb-6 animate-pulse"></div>

        {/* Recipe Meta Information Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center p-4 bg-muted rounded-lg animate-pulse">
              <div className="h-8 bg-muted-foreground/20 rounded mb-2"></div>
              <div className="h-4 bg-muted-foreground/20 rounded w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Ingredients Skeleton */}
        <div>
          <div className="h-8 bg-muted rounded-lg mb-6 animate-pulse"></div>
          <Card>
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-2">
                    <div className="h-4 bg-muted rounded w-16 animate-pulse"></div>
                    <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions Skeleton */}
        <div>
          <div className="h-8 bg-muted rounded-lg mb-6 animate-pulse"></div>
          <Card>
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 bg-muted rounded-full animate-pulse"></div>
                    <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tips Skeleton */}
      <div className="mt-12">
        <div className="h-8 bg-muted rounded-lg mb-6 animate-pulse"></div>
        <Card>
          <CardContent className="py-6">
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2 animate-pulse"></div>
                  <div className="h-4 bg-muted rounded flex-1 animate-pulse"></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 