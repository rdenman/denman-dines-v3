import { notFound, unauthorized } from "next/navigation";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { RecipeForm } from "@/components/recipe-form";
import { getSession } from "@/lib/auth.server";
import { getRecipeBySlug } from "@/lib/recipe";

interface EditRecipePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const session = await getSession();

  if (!session?.user) {
    unauthorized();
  }

  const recipe = await getRecipeBySlug(decodedSlug);

  if (!recipe) {
    notFound();
  }

  if (recipe.userId !== session.user.id) {
    unauthorized();
  }

  const initialData = {
    id: recipe.id,
    slug: recipe.slug,
    title: recipe.title,
    description: recipe.description || "",
    photo: recipe.photo || "",
    servings: recipe.servings || undefined,
    prepTime: recipe.prepTime || undefined,
    cookTime: recipe.cookTime || undefined,
    tips: recipe.tips.map((text) => ({ text })),
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
      instructions: section.instructions.map((instruction) => ({
        text: instruction.text,
      })),
    })),
  };

  return (
    <PageContainer size="narrow">
      <PageHeader
        title="Edit Recipe"
        description="Update your recipe details"
      />
      <RecipeForm mode="edit" initialData={initialData} />
    </PageContainer>
  );
}
