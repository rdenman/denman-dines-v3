import { PageContainer } from "@/components/page-container";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipeLoading() {
  return (
    <PageContainer size="narrow">
      <div className="mb-5 space-y-2 sm:mb-8 sm:space-y-3">
        <Skeleton className="h-8 w-2/3 sm:h-10" />
        <Skeleton className="h-4 w-full max-w-lg sm:h-5" />
        <Skeleton className="aspect-4/3 w-full rounded-lg sm:aspect-video sm:rounded-xl" />
      </div>

      <div className="mb-5 flex justify-center gap-4 sm:mb-8 sm:gap-6">
        <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
        <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
        <Skeleton className="h-4 w-16 sm:h-5 sm:w-20" />
      </div>

      <div className="space-y-6 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
        <div className="space-y-2 sm:space-y-3">
          <Skeleton className="h-6 w-28 sm:h-7 sm:w-32" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <Skeleton className="h-6 w-28 sm:h-7 sm:w-32" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
