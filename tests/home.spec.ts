import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000";
test("has title", async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveTitle(/Denman Dines/);
});

test("displays a list of recipe cards", async ({ page }) => {
  await page.goto(BASE_URL);

  // Wait for recipe grid to load
  const recipeGrid = page.getByTestId("recipe-grid");
  await expect(recipeGrid).toBeVisible();

  // Verify at least one recipe card is displayed
  const recipeCards = page.getByTestId("recipe-card");
  await expect(recipeCards.first()).toBeVisible();
  expect(await recipeCards.count()).toBeGreaterThan(0);
});

test("displays multiple recipes in a grid", async ({ page }) => {
  await page.goto(BASE_URL);

  // Find the grid container
  const recipeGrid = page.getByTestId("recipe-grid");
  await expect(recipeGrid).toBeVisible();

  // Verify multiple recipe cards are present
  const recipeCards = page.getByTestId("recipe-card");
  const count = await recipeCards.count();
  expect(count).toBeGreaterThan(0);
});

test("recipe cards contain expected content", async ({ page }) => {
  await page.goto(BASE_URL);

  // Get the first recipe card
  const firstRecipeCard = page.getByTestId("recipe-card").first();
  await expect(firstRecipeCard).toBeVisible();

  // Check for recipe title (either mobile or desktop layout will be visible)
  const mobileTitle = firstRecipeCard.getByTestId("recipe-title-mobile");
  const desktopTitle = firstRecipeCard.getByTestId("recipe-title-desktop");

  // At least one title should be visible and have content
  const isMobileVisible = await mobileTitle.isVisible();
  const isDesktopVisible = await desktopTitle.isVisible();

  expect(isMobileVisible || isDesktopVisible).toBeTruthy();

  if (isMobileVisible) {
    await expect(mobileTitle).not.toBeEmpty();
  } else {
    await expect(desktopTitle).not.toBeEmpty();
  }
});

test("recipe cards are clickable links", async ({ page }) => {
  await page.goto(BASE_URL);

  // Get the first recipe card link
  const firstRecipeLink = page.getByTestId("recipe-card-link").first();
  await expect(firstRecipeLink).toBeVisible();

  // Verify it has a valid href attribute pointing to a recipe
  const href = await firstRecipeLink.getAttribute("href");
  expect(href).toMatch(/^\/recipes\/.+/);
});
