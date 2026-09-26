import { expect, test } from "@playwright/test";

test("search via URL shows results or empty state", async ({ page }) => {
  await page.goto("/?q=pasta");

  const resultsHeading = page.getByRole("heading", {
    name: /Search results for "pasta"/i,
  });
  const emptyHeading = page.getByRole("heading", { name: "No recipes found" });

  await expect(resultsHeading.or(emptyHeading)).toBeVisible();
});

test("sort via URL loads sorted recipe list", async ({ page }) => {
  await page.goto("/?sort=title-asc");

  const recipeGrid = page.getByTestId("recipe-grid");
  await expect(recipeGrid).toBeVisible();
  await expect(page.getByTestId("recipe-card").first()).toBeVisible();

  await expect(page.getByLabel("Sort recipes by")).toContainText("Title A-Z");
});

test("unknown recipe slug shows not found page", async ({ page }) => {
  await page.goto("/recipes/this-recipe-definitely-does-not-exist-xyz");

  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Back to Home" }),
  ).toBeVisible();
});

test("create recipe requires sign in when unauthenticated", async ({
  page,
}) => {
  await page.goto("/recipes/new");

  await expect(
    page.getByRole("heading", { name: "Sign in required" }),
  ).toBeVisible();
  await expect(
    page.getByText("You need to be logged in to access this page."),
  ).toBeVisible();
});
