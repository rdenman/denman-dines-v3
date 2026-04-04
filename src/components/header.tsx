import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { AuthSection } from "@/components/auth-section";
import { MobileHeader } from "@/components/mobile-header";
import { ModeToggle } from "@/components/mode-toggle";
import { RecipeSearch } from "@/components/recipe-search";
import { Skeleton } from "@/components/ui/skeleton";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 pt-safe backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Mobile: expandable search pattern */}
        <div className="sm:hidden">
          <MobileHeader />
        </div>

        {/* Desktop: single row with inline search */}
        <div className="hidden h-16 items-center gap-4 sm:flex">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative size-8">
              <Image
                src="/logo.webp"
                alt="Denman Dines Logo"
                fill
                className="object-contain"
                priority
                sizes="32px"
              />
            </div>
            <span className="font-serif text-xl font-bold">Denman Dines</span>
          </Link>

          <div className="max-w-md flex-1">
            <Suspense fallback={<Skeleton className="h-9 w-full" />}>
              <RecipeSearch
                placeholder="Search recipes..."
                className="w-full"
              />
            </Suspense>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <ModeToggle />
            <AuthSection />
          </div>
        </div>
      </div>
    </header>
  );
}
