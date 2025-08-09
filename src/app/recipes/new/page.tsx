import { RecipeForm } from "@/components/recipe-form";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NewRecipePage() {
  // TODO make a requireAuth function
  const session = await auth();
  if (!session?.user) {
    // TODO create an unauthenticated page with a link to sign in
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Create New Recipe</h1>
          <p className="text-muted-foreground mt-2">
            Share your favorite recipe with the community
          </p>
        </div>
        <RecipeForm />
      </div>
    </div>
  );
}
