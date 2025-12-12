"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";
import { Edit } from "lucide-react";
import Link from "next/link";

interface OwnerEditButtonProps {
  recipeUserId: string;
  slug: string;
}

export function OwnerEditButton({ recipeUserId, slug }: OwnerEditButtonProps) {
  const { data } = useSession();
  if (data?.user?.id !== recipeUserId) {
    return null;
  }

  return (
    <Button asChild size="sm" variant="outline">
      <Link href={`/recipes/${slug}/edit`} className="flex items-center gap-2">
        <Edit className="h-4 w-4" />
        Edit Recipe
      </Link>
    </Button>
  );
}
