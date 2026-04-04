import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  children?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center sm:py-16">
      <div className="mb-4 rounded-full bg-muted p-3 sm:p-4">
        <Icon className="size-6 text-muted-foreground sm:size-8" />
      </div>
      <h2 className="font-serif text-lg font-semibold sm:text-xl">{title}</h2>
      <p className="mt-1.5 max-w-xs text-sm text-muted-foreground sm:mt-2 sm:max-w-sm sm:text-base">
        {description}
      </p>
      {children && (
        <div className="mt-5 flex flex-col gap-2 sm:mt-6 sm:flex-row sm:gap-3">
          {children}
        </div>
      )}
    </div>
  );
}
