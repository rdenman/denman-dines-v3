import { RecipeForm } from "@/components/recipe-form";
import { auth } from "@/lib/auth";
import { unauthorized } from "next/navigation";

export default async function NewRecipePage() {
  const session = await auth();
  if (!session?.user) {
    unauthorized();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Create New Recipe</h1>
        <p className="text-lg text-muted-foreground">
          Share your culinary masterpiece with the world!
        </p>
      </div>
      <RecipeForm mode="create" />
    </div>
  );
}
