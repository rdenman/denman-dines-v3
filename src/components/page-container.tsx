import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}

const sizeClasses = {
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

export function PageContainer({
  children,
  className,
  size = "default",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        sizeClasses[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
