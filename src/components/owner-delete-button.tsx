"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { type MouseEvent, useState } from "react";
import { toast } from "sonner";
import { clearAllRecipeListCaches } from "@/components/infinite-recipe-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth";

interface OwnerDeleteButtonProps {
  recipeId: string;
  recipeUserId: string;
  recipeTitle: string;
}

export function OwnerDeleteButton({
  recipeId,
  recipeUserId,
  recipeTitle,
}: OwnerDeleteButtonProps) {
  const router = useRouter();
  const { data, isPending } = useSession();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isPending || data?.user?.id !== recipeUserId) {
    return null;
  }

  const handleDelete = async (
    event: MouseEvent<HTMLButtonElement>,
  ): Promise<void> => {
    // Keep the dialog open until the request resolves
    event.preventDefault();
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/recipes/${recipeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status ${response.status}`);
      }

      clearAllRecipeListCaches();
      setOpen(false);
      router.replace("/");
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast.error("Couldn't delete recipe. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => !isDeleting && setOpen(next)}
    >
      <AlertDialogTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="shrink-0"
          aria-label="Delete recipe"
          data-testid="delete-recipe-button"
        >
          <Trash2 className="size-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent data-testid="delete-recipe-dialog">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this recipe?</AlertDialogTitle>
          <AlertDialogDescription>
            &ldquo;{recipeTitle}&rdquo; will be permanently deleted. This can't
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isDeleting}
            data-testid="delete-recipe-cancel"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
            data-testid="delete-recipe-confirm"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
