import { unauthorized } from "next/navigation";
import { PageContainer } from "@/components/page-container";
import { PageHeader } from "@/components/page-header";
import { RecipeForm } from "@/components/recipe-form";
import { getSession } from "@/lib/auth.server";

export default async function NewRecipePage() {
  const session = await getSession();
  if (!session?.user) {
    unauthorized();
  }

  return (
    <PageContainer size="narrow">
      <PageHeader
        title="Create New Recipe"
        description="Share your culinary masterpiece with the world"
      />
      <RecipeForm mode="create" />
    </PageContainer>
  );
}
