"use client";

import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { AuthSection } from "@/components/auth-section";
import { ModeToggle } from "@/components/mode-toggle";
import { RecipeSearch } from "@/components/recipe-search";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

function MobileHeaderInner() {
  const searchParams = useSearchParams();
  const activeQuery = searchParams.get("q");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen) {
      const input = searchContainerRef.current?.querySelector("input");
      input?.focus();
    }
  }, [searchOpen]);

  if (searchOpen) {
    return (
      <div ref={searchContainerRef} className="flex items-center gap-2 py-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 shrink-0"
          onClick={() => setSearchOpen(false)}
          aria-label="Close search"
        >
          <ArrowLeft className="size-4" />
        </Button>
        <Suspense fallback={<Skeleton className="h-10 flex-1 rounded-md" />}>
          <RecipeSearch placeholder="Search recipes..." className="flex-1" />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="flex h-12 items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <div className="relative size-7">
          <Image
            src="/logo.webp"
            alt="Denman Dines Logo"
            fill
            className="object-contain"
            priority
            sizes="28px"
          />
        </div>
        <span className="font-serif text-lg font-bold">Denman Dines</span>
      </Link>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSearchOpen(true)}
          aria-label="Search recipes"
          className="relative size-8"
        >
          <Search className="size-4" />
          {activeQuery && (
            <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-primary" />
          )}
        </Button>
        <ModeToggle />
        <AuthSection />
      </div>
    </div>
  );
}

export function MobileHeader() {
  return (
    <Suspense
      fallback={
        <div className="flex h-12 items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="size-7 rounded" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="size-9 rounded-md" />
            <Skeleton className="h-9 w-20 rounded-md" />
          </div>
        </div>
      }
    >
      <MobileHeaderInner />
    </Suspense>
  );
}
