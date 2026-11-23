import type { Page, Route } from "@playwright/test";
import { expect, test } from "@playwright/test";

interface ListedRecipe {
  id: string;
  slug: string;
  userId: string;
}

/**
 * Pick a real recipe from the list API so the detail page renders, then
 * mock the auth session so the viewer is (or isn't) that recipe's author.
 */
async function openRecipeAs(
  page: Page,
  viewer: "owner" | "other" | "anonymous",
): Promise<ListedRecipe> {
  const response = await page.request.get("/api/recipes/list?page=1&size=1");
  const { recipes } = (await response.json()) as { recipes: ListedRecipe[] };
  const recipe = recipes[0];
  if (!recipe) {
    throw new Error("No recipes available to test against");
  }

  await page.route("**/api/auth/get-session*", (route: Route) => {
    if (viewer === "anonymous") {
      return route.fulfill({ json: null });
    }
    const userId = viewer === "owner" ? recipe.userId : "someone-else";
    return route.fulfill({
      json: {
        session: {
          id: "test-session",
          userId,
          token: "test-token",
          expiresAt: new Date(Date.now() + 3_600_000).toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        user: {
          id: userId,
          name: "Test User",
          email: "test@example.com",
          emailVerified: true,
          image: null,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      },
    });
  });

  await page.goto(`/recipes/${encodeURIComponent(recipe.slug)}`);
  await expect(page.getByTestId("recipe-title")).toBeVisible({
    timeout: 10_000,
  });
  return recipe;
}

test("delete button is hidden from viewers who aren't the author", async ({
  page,
}) => {
  await openRecipeAs(page, "other");
  await expect(page.getByTestId("keep-awake-toggle")).toBeVisible();
  await expect(page.getByTestId("delete-recipe-button")).toHaveCount(0);
});

test("cancelling the dialog does not delete the recipe", async ({ page }) => {
  let deleteCalled = false;
  await page.route("**/api/recipes/*", (route: Route) => {
    if (route.request().method() === "DELETE") {
      deleteCalled = true;
      return route.fulfill({ status: 204 });
    }
    return route.fallback();
  });

  await openRecipeAs(page, "owner");
  await page.getByTestId("delete-recipe-button").click();
  await expect(page.getByTestId("delete-recipe-dialog")).toBeVisible();

  await page.getByTestId("delete-recipe-cancel").click();
  await expect(page.getByTestId("delete-recipe-dialog")).toHaveCount(0);
  expect(deleteCalled).toBe(false);
});

test("confirming deletes the recipe and returns home", async ({ page }) => {
  let deletedPath: string | null = null;
  await page.route("**/api/recipes/*", (route: Route) => {
    if (route.request().method() === "DELETE") {
      deletedPath = new URL(route.request().url()).pathname;
      return route.fulfill({ status: 204 });
    }
    return route.fallback();
  });

  const recipe = await openRecipeAs(page, "owner");
  await page.getByTestId("delete-recipe-button").click();
  await page.getByTestId("delete-recipe-confirm").click();

  await page.waitForURL((url) => url.pathname === "/");
  expect(deletedPath).toBe(`/api/recipes/${recipe.id}`);
});

test("a failed delete shows an error toast and stays on the page", async ({
  page,
}) => {
  await page.route("**/api/recipes/*", (route: Route) => {
    if (route.request().method() === "DELETE") {
      return route.fulfill({
        status: 500,
        json: { error: "Failed to delete recipe" },
      });
    }
    return route.fallback();
  });

  const recipe = await openRecipeAs(page, "owner");
  await page.getByTestId("delete-recipe-button").click();
  await page.getByTestId("delete-recipe-confirm").click();

  await expect(
    page.getByText("Couldn't delete recipe. Please try again."),
  ).toBeVisible();
  await expect(page.getByTestId("delete-recipe-dialog")).toBeVisible();
  await expect(page.getByTestId("delete-recipe-confirm")).toBeEnabled();
  expect(new URL(page.url()).pathname).toBe(
    `/recipes/${encodeURIComponent(recipe.slug)}`,
  );
});
