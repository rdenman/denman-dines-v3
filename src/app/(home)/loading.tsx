import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PLACEHOLDERS = Array.from({ length: 8 });

export default function HomeLoading() {
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {PLACEHOLDERS.map((_, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <Skeleton className="w-full aspect-4/3 rounded-lg" />
            </CardHeader>
            <CardContent className="space-y-3">
              <CardTitle>
                <Skeleton className="h-6 w-3/4" />
              </CardTitle>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
