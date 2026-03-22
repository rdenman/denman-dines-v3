import { parseRecipeSearchParams } from "@/lib/query.server";
import { getPaginatedRecipes } from "@/lib/recipe";
import { NextRequest, NextResponse } from "next/server";

/**
 * API endpoint for fetching paginated recipes as JSON
 * Used by infinite scroll component on the home page
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = Object.fromEntries(request.nextUrl.searchParams);
    const { page, size, sort, q } = await parseRecipeSearchParams(searchParams);

    const { recipes, totalCount, totalPages, currentPage } =
      await getPaginatedRecipes({ page, size, sort, q });

    return NextResponse.json({
      recipes,
      totalCount,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 }
    );
  }
}
