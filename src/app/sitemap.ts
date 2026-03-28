import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import { CACHE_TAGS } from "@/lib/recipe";

const getCachedRecipeSlugs = unstable_cache(
  async () => {
    return prisma.recipe.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });
  },
  ["sitemap-recipes"],
  {
    tags: [CACHE_TAGS.RECIPES],
    revalidate: 3600,
  },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const recipes = await getCachedRecipeSlugs();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://denmandines.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `https://denmandines.com/recipes/${encodeURIComponent(recipe.slug)}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages];
}
