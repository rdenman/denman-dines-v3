"use client";

import { SquarePen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

interface OwnerEditButtonProps {
  recipeUserId: string;
  slug: string;
}

export function OwnerEditButton({ recipeUserId, slug }: OwnerEditButtonProps) {
  const { data, isPending } = useSession();

  if (isPending || data?.user?.id !== recipeUserId) {
    return null;
  }

  return (
    <Button asChild size="icon" variant="ghost" className="shrink-0">
      <Link href={`/recipes/${slug}/edit`} aria-label="Edit recipe">
        <SquarePen className="size-4" />
      </Link>
    </Button>
  );
}
