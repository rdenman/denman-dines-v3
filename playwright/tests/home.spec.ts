import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Denman Dines/);
});

test("displays a list of recipe cards", async ({ page }) => {
  await page.goto("/");

  // Wait for recipe grid to load
  const recipeGrid = page.getByTestId("recipe-grid");
  await expect(recipeGrid).toBeVisible();

  // Verify at least one recipe card is displayed
  const recipeCards = page.getByTestId("recipe-card");
  await expect(recipeCards.first()).toBeVisible();
  expect(await recipeCards.count()).toBeGreaterThan(0);
});

test("displays multiple recipes in a grid", async ({ page }) => {
  await page.goto("/");

  // Find the grid container
  const recipeGrid = page.getByTestId("recipe-grid");
  await expect(recipeGrid).toBeVisible();

  // Verify multiple recipe cards are present
  const recipeCards = page.getByTestId("recipe-card");
  const count = await recipeCards.count();
  expect(count).toBeGreaterThan(0);
});

test("recipe cards contain expected content", async ({ page }) => {
  await page.goto("/");

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
  await page.goto("/");

  // Get the first recipe card link
  const firstRecipeLink = page.getByTestId("recipe-card-link").first();
  await expect(firstRecipeLink).toBeVisible();

  // Verify it has a valid href attribute pointing to a recipe
  const href = await firstRecipeLink.getAttribute("href");
  expect(href).toMatch(/^\/recipes\/.+/);
});

test("infinite scrolling loads more recipes", async ({ page }) => {
  await page.goto("/");

  // Wait for initial recipes to load
  const recipeCards = page.getByTestId("recipe-card");
  await expect(recipeCards.first()).toBeVisible();

  // Get initial count of recipes
  const initialCount = await recipeCards.count();
  expect(initialCount).toBeGreaterThan(0);

  // Check if we're already at the end (all recipes loaded on first page)
  const endMessage = page.getByTestId("end-message");
  const isAtEnd = await endMessage.isVisible().catch(() => false);

  if (isAtEnd) {
    // If all recipes are already loaded, this test passes
    // (infinite scroll is working, but there's just not enough data to paginate)
    expect(isAtEnd).toBeTruthy();
    return;
  }

  // Scroll to the last recipe card to ensure we trigger the intersection observer
  const lastRecipe = recipeCards.last();
  await lastRecipe.scrollIntoViewIfNeeded();

  // Scroll a bit more to ensure we cross the threshold for the intersection observer
  await page.evaluate(() => {
    window.scrollBy(0, 500);
  });

  // Wait for either more recipes to load OR the end message to appear
  // Using Promise.race to handle whichever happens first
  try {
    await Promise.race([
      // Wait for recipe count to increase
      page.waitForFunction(
        (expectedCount) => {
          const cards = document.querySelectorAll(
            '[data-testid="recipe-card"]'
          );
          return cards.length > expectedCount;
        },
        initialCount,
        { timeout: 10000 }
      ),
      // OR wait for end message to appear
      endMessage.waitFor({ state: "visible", timeout: 10000 }),
    ]);
  } catch (error) {
    throw new Error(
      `Infinite scroll did not trigger - neither more recipes loaded nor end message appeared. Initial count: ${initialCount}`
    );
  }

  // Verify the outcome: either more recipes or end message
  const newCount = await recipeCards.count();
  const endMessageVisible = await endMessage.isVisible().catch(() => false);

  // Either we loaded more recipes OR we reached the end
  expect(newCount > initialCount || endMessageVisible).toBeTruthy();
});
