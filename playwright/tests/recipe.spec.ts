import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * Helper function to navigate from home page to the first recipe
 */
async function navigateToFirstRecipe(page: Page): Promise<void> {
  await page.goto("/");
  const firstRecipeLink = page.getByTestId("recipe-card-link").first();

  // Click and wait for navigation (using Promise.all to avoid race conditions)
  await Promise.all([
    page.waitForURL(/\/recipes\/.+/, { timeout: 15000 }),
    firstRecipeLink.click(),
  ]);

  // Wait for page to be fully loaded
  await page.waitForLoadState("domcontentloaded");
}

test("navigates from home to recipe and displays full recipe details", async ({
  page,
}) => {
  // Navigate from home to the first recipe
  await navigateToFirstRecipe(page);

  // Verify recipe title is displayed and has content
  const recipeTitle = page.getByTestId("recipe-title");
  await expect(recipeTitle).toBeVisible();
  // Wait for the title to have actual content (not empty)
  await page.waitForFunction(
    () => {
      const title = document.querySelector('[data-testid="recipe-title"]');
      return title && title.textContent && title.textContent.trim().length > 0;
    },
    { timeout: 10000 }
  );

  // Verify ingredients section exists and has content
  const ingredientsSection = page.getByTestId("ingredients-section");
  await expect(ingredientsSection).toBeVisible();

  // Check that at least one ingredient is displayed
  const ingredients = page.getByTestId("ingredient-item");
  const ingredientCount = await ingredients.count();
  expect(ingredientCount).toBeGreaterThan(0);

  // Verify instructions section exists and has content
  const instructionsSection = page.getByTestId("instructions-section");
  await expect(instructionsSection).toBeVisible();

  // Check that at least one instruction is displayed
  const instructions = page.getByTestId("instruction-item");
  const instructionCount = await instructions.count();
  expect(instructionCount).toBeGreaterThan(0);
});

test("recipe page displays ingredient sections", async ({ page }) => {
  // Navigate from home to the first recipe
  await navigateToFirstRecipe(page);

  // Wait for ingredients section to be visible
  const ingredientsSection = page.getByTestId("ingredients-section");
  await expect(ingredientsSection).toBeVisible({ timeout: 10000 });

  // Verify ingredient section cards are displayed
  const ingredientSectionCards = page.getByTestId("ingredient-section-card");
  await expect(ingredientSectionCards.first()).toBeVisible({ timeout: 10000 });
  expect(await ingredientSectionCards.count()).toBeGreaterThan(0);
});

test("recipe page displays instruction sections", async ({ page }) => {
  // Navigate from home to the first recipe
  await navigateToFirstRecipe(page);

  // Wait for instructions section to be visible
  const instructionsSection = page.getByTestId("instructions-section");
  await expect(instructionsSection).toBeVisible({ timeout: 10000 });

  // Verify instruction section cards are displayed
  const instructionSectionCards = page.getByTestId("instruction-section-card");
  await expect(instructionSectionCards.first()).toBeVisible({ timeout: 10000 });
  expect(await instructionSectionCards.count()).toBeGreaterThan(0);
});

test("recipe page has correct title in browser", async ({ page }) => {
  // Navigate from home to the first recipe
  await navigateToFirstRecipe(page);

  // Wait for the recipe title to load with content
  const recipeTitle = page.getByTestId("recipe-title");
  await expect(recipeTitle).toBeVisible({ timeout: 10000 });
  await page.waitForFunction(
    () => {
      const title = document.querySelector('[data-testid="recipe-title"]');
      return title && title.textContent && title.textContent.trim().length > 0;
    },
    { timeout: 10000 }
  );

  // Get the recipe title text
  const titleText = await recipeTitle.textContent();

  // Verify the browser title matches the recipe title
  await expect(page).toHaveTitle(titleText + " | Denman Dines");
});
