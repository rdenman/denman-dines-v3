"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

export function CreateRecipeFab() {
  const { data: session, isPending } = useSession();

  if (isPending || !session?.user) return null;

  return (
    <Button
      asChild
      size="icon"
      className="fixed right-6 bottom-6 z-40 size-14 rounded-full shadow-lg sm:hidden pb-safe"
    >
      <Link href="/recipes/new" aria-label="Create recipe">
        <Plus className="size-6" />
      </Link>
    </Button>
  );
}
