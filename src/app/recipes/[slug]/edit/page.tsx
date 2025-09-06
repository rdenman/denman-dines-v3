import { RecipeForm } from "@/components/recipe-form";
import { auth } from "@/lib/auth";
import { getRecipeBySlug } from "@/lib/recipe";
import { notFound, unauthorized } from "next/navigation";

interface EditRecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const session = await auth();

  if (!session?.user) {
    unauthorized();
  }

  const recipe = await getRecipeBySlug(decodedSlug);

  if (!recipe) {
    notFound();
  }

  // Check if the current user owns this recipe
  if (recipe.userId !== session.user.id) {
    unauthorized();
  }

  // Transform the recipe data to match the form structure
  const initialData = {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description || "",
    photo: recipe.photo || "",
    servings: recipe.servings || undefined,
    prepTime: recipe.prepTime || undefined,
    cookTime: recipe.cookTime || undefined,
    tips: recipe.tips,
    ingredientSections: recipe.ingredientSections.map((section) => ({
      name: section.name,
      ingredients: section.ingredients.map((ingredient) => ({
        name: ingredient.name,
        amount: ingredient.amount || "",
        preparation: ingredient.preparation || "",
      })),
    })),
    instructionSections: recipe.instructionSections.map((section) => ({
      name: section.name,
      instructions: section.instructions.map((instruction) => instruction.text),
    })),
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Edit Recipe</h1>
        <p className="text-lg text-muted-foreground">
          Update your recipe details and make it even better!
        </p>
      </div>
      <RecipeForm mode="edit" initialData={initialData} />
    </div>
  );
}
