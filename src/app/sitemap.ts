import prisma from "@/lib/prisma";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all recipes from database
  const recipes = await prisma.recipe.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: "https://denmandines.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Dynamic recipe pages
  const recipePages: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `https://denmandines.com/recipes/${encodeURIComponent(recipe.slug)}`,
    lastModified: recipe.updatedAt,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...recipePages];
}
